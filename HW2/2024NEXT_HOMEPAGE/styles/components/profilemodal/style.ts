import styled from 'styled-components';

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    background: #fff;
    padding: 40px;
    border-radius: 15px;
    width: 90%;
    max-width: 450px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

export const ProfileContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 0px;
    right: 0px;
    background: none;
    border: none;
    font-size: 25px;
    cursor: pointer;
    color: #999;

    &:hover {
        color: #333;
    }
`;

export const ProfileImgBox = styled.div`
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
`;

export const ProfileNameContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const SocialIcons = styled.div`
    display: flex;
    gap: 10px;

    a {
        display: inline-block;
        width: 20px;
        height: 20px;
    }

    img {
        display: block;
        width: 100%;
        height: 100%;
    }
`;

export const PlaceholderImg = styled.div`
    width: 120px;
    height: 120px;
    background-color: #eee;
    border-radius: 100%;
`;

export const ProfileHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 20px;
`;

export const ProfileName = styled.h2`
    font-size: 22px;
    font-weight: bold;
    color: #333;
`;

export const ProfileIntro = styled.p`
    font-size: 16px;
    font-weight: 500;
    color: #555;
    padding: 10px 0;
    border-bottom: 0.5px solid;
`;

export const ProfileMeta = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
`;

export const ProfileMetaItem = styled.p`
    font-size: 14px;
    margin: 4px 0;
    color: #666;
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
    color: #333;
    margin-bottom: 10px;
`;

export const ProfileSubTitle = styled.h4`
    font-size: 16px;
    font-weight: bold;
    color: #666;
    margin-bottom: 5px;
`;

export const ProfileText = styled.p`
    font-size: 14px;
    color: #555;
`;

export const EntryContainer = styled.div`
    display: inline-flex;
    align-items: center;
    margin-right: -0.7rem;
`;
