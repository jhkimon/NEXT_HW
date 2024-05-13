from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from .models import User


class UserCreationForm(forms.ModelForm):
    password1 = forms.CharField(label="Password", widget=forms.PasswordInput(attrs={'placeholder': '비밀번호 | 8자 이상 입력'}))
    password2 = forms.CharField(label="Password Confirmation", widget=forms.PasswordInput(attrs={'placeholder': '비밀번호 확인 | 8자 이상 입력'}))

    class Meta:
        model = User
        fields = ("username", )
        widgets = {
            'username': forms.TextInput(attrs={'placeholder': '아이디 | 8자 이상 입력'})
        }


    def clean_username(self):  # Corrected method name for username validation
        cd = self.cleaned_data
        username = cd.get("username")
        if get_user_model().objects.filter(username=username).exists():
            raise forms.ValidationError("이미 존재하는 아이디입니다.")
        elif len(username) < 8:
            raise forms.ValidationError("아이디는 8자 이상으로 설정해주세요.")
        return username

    def clean_password2(self): # 검증 로직 - Password
        cd = self.cleaned_data
        if cd["password1"] != cd["password2"]:
            raise forms.ValidationError("비밀번호가 일치하지 않습니다.")
        elif len(cd['password1']) < 8:
            raise forms.ValidationError("비밀번호는 8자 이상으로 설정해주세요.")
        return cd["password2"]
    

    def save(self, commit=True) -> User: # 모델 생성
        user = User.objects.create_user(
            username=self.cleaned_data["username"],
            password=self.cleaned_data["password1"],
        )
        if commit:
            user.save()
        return user


class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput())

    def clean(self):
        cd = self.cleaned_data
        username = cd.get("username")
        password = cd.get("password")

        if username and password:
            user = authenticate(username=username, password=password)
            if user is None:
                raise forms.ValidationError("유저 이름 또는 비밀번호가 올바르지 않습니다.")
        return cd