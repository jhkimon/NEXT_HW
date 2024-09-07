import styled from 'styled-components';

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 90%;
    max-width: 500px;
`;

export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ProfileHeader = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20px;
`;

export const ProfileImgBox = styled.div`
    margin-bottom: 15px;
`;

export const ProfileName = styled.h2`
    font-size: 24px;
    font-weight: bold;
    margin: 0;
`;

export const ProfileContent = styled.div`
    width: 100%;
`;

export const ProfileSection = styled.div`
    margin-bottom: 20px;
`;

export const ProfileTitle = styled.h3`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
`;

export const ProfileSubTitle = styled.h4`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
`;

export const ProfileText = styled.p`
    font-size: 14px;
    margin: 0;
`;

export const CloseButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #555;
    }
`;
