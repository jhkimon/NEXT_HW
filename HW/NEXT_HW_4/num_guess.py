high = int(input("숫자 게임의 최대값을 입력해주세요."))
print("1부터 200까지의 숫자를 하나 생각하세요.")
input("준비가 되었으면 Enter를 누르세요.")


low = 0
count = 0


while True:
    mid = int((low + high) / 2)
    print(f"당신이 생각한 숫자는 {mid}입니까?")
    result = input("제가 맞췄다면 '맞음', 제가 제시한 숫자보다 크다면'큼',작다면 '작음'을 입력해주세요.")
    count += 1
    if result == "맞음":
        print(f"당신의 숫자를 {count}번만에 맞췄습니다.")
        break;
    elif result == "큼":
        low = mid
    elif result == "작음":
        high = mid
    else:
        print("다른 명령어를 입력해주세요.")
