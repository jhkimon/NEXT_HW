import React from 'react';
import * as S from 'styles/components/profilemodal/style';
import CareerCard from '../CareerCard';
import { PEOPLE_INFORMATION_TYPE } from 'types/people/people-information';
import Image from 'next/image';

interface ProfileModalProps {
    person: PEOPLE_INFORMATION_TYPE;
    onRequestClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ person, onRequestClose }) => {
    return (
        <S.ModalOverlay>
            <S.ModalContent>
                <S.ProfileContainer>
                    <S.CloseButton onClick={onRequestClose}>×</S.CloseButton>
                    <S.ProfileImgBox>
                        {person.imgSrc ? (
                            <Image
                                src={person.imgSrc}
                                alt={person.name}
                                width={120}
                                height={120}
                                style={{ borderRadius: '10%' }}
                            />
                        ) : (
                            <S.PlaceholderImg />
                        )}
                    </S.ProfileImgBox>
                    <S.ProfileHeader>
                        <S.ProfileNameContainer>
                            <S.ProfileName>{person.name}</S.ProfileName>
                            <S.SocialIcons>
                                {person.instagram && (
                                    <a href={person.instagram} target="_blank" rel="noopener noreferrer">
                                        <Image
                                            src="/images/profile/social/instagram.png"
                                            alt="Instagram"
                                            width={20}
                                            height={20}
                                        />
                                    </a>
                                )}
                                {person.linkedin && (
                                    <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
                                        <Image
                                            src="/images/profile/social/linkedin.png"
                                            alt="LinkedIn"
                                            width={20}
                                            height={20}
                                        />
                                    </a>
                                )}
                            </S.SocialIcons>
                        </S.ProfileNameContainer>
                        <S.ProfileIntro>{person.intro || '제 프로필에 오신 것을 환영합니다.'}</S.ProfileIntro>
                    </S.ProfileHeader>

                    <S.ProfileContent>
                        <S.ProfileSection>
                            <S.ProfileTitle>👩‍💻 Career</S.ProfileTitle>
                            {person.career && person.career.length > 0 ? (
                                person.career.map((entry, index) => (
                                    <S.EntryContainer key={index}>
                                        <CareerCard text={`${entry.startDate} ~ ${entry.endDate}`} />
                                        <S.ProfileText>{entry.role}</S.ProfileText>
                                    </S.EntryContainer>
                                ))
                            ) : (
                                <S.EntryContainer>
                                    <CareerCard text="NEXT 12기" />
                                    <S.ProfileText>No career entries available</S.ProfileText>
                                </S.EntryContainer>
                            )}
                        </S.ProfileSection>
                        <S.ProfileSection>
                            <S.ProfileTitle>🛠️ Tools & Skills</S.ProfileTitle>
                            <S.ProfileSubTitle>Tools</S.ProfileSubTitle>
                            {person.tools && person.tools.length > 0 ? (
                                person.tools.map((tool, index) => (
                                    <S.EntryContainer key={index}>
                                        <CareerCard text={tool} />
                                    </S.EntryContainer>
                                ))
                            ) : (
                                <S.ProfileText>No tools listed</S.ProfileText>
                            )}
                            <S.ProfileSubTitle>Skills</S.ProfileSubTitle>
                            {person.skills && person.skills.length > 0 ? (
                                person.skills.map((tool, index) => (
                                    <S.EntryContainer key={index}>
                                        <CareerCard text={tool} />
                                    </S.EntryContainer>
                                ))
                            ) : (
                                <S.ProfileText>No skills listed</S.ProfileText>
                            )}
                        </S.ProfileSection>
                    </S.ProfileContent>
                </S.ProfileContainer>
            </S.ModalContent>
        </S.ModalOverlay>
    );
};

export default ProfileModal;
