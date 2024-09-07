import React from 'react';
import * as S from 'styles/components/profilemodal/style';
import { PEOPLE_INFORMATION_TYPE } from 'types/people/people-information';
import Modal from 'react-modal';
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
                    <S.ProfileHeader>
                        <S.ProfileImgBox>
                            {person.imgSrc ? (
                                <Image src={person.imgSrc} alt={person.name} width={120} height={120} />
                            ) : (
                                <div
                                    style={{
                                        backgroundColor: '#333333',
                                        width: '120px',
                                        height: '120px',
                                        borderRadius: '50%',
                                    }}
                                />
                            )}
                        </S.ProfileImgBox>
                        <S.ProfileName>{person.name}</S.ProfileName>
                    </S.ProfileHeader>

                    <S.ProfileContent>
                        <S.ProfileSection>
                            <S.ProfileTitle>🎓 Education</S.ProfileTitle>
                        </S.ProfileSection>

                        <S.ProfileSection>
                            <S.ProfileTitle>👩‍💻 Career</S.ProfileTitle>
                            Hi
                        </S.ProfileSection>

                        <S.ProfileSection>
                            <S.ProfileTitle>📝 Tool & Skill</S.ProfileTitle>
                            <S.ProfileSubTitle>Tool</S.ProfileSubTitle>

                            <S.ProfileSubTitle>Skill</S.ProfileSubTitle>
                        </S.ProfileSection>
                    </S.ProfileContent>

                    <S.CloseButton onClick={onRequestClose}>Close</S.CloseButton>
                </S.ProfileContainer>
            </S.ModalContent>
        </S.ModalOverlay>
    );
};

export default ProfileModal;
