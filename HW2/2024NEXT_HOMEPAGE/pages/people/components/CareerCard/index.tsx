import React from 'react';
import * as S from 'styles/components/careercard/style';

interface CareerCardProps {
    text: string;
}

const CareerCard: React.FC<CareerCardProps> = ({ text }) => {
    return (
        <S.Card>
            <S.FlexContainer>
                <S.Data>{text}</S.Data>
            </S.FlexContainer>
        </S.Card>
    );
};

export default CareerCard;
