'use client';

import styled from 'styled-components';
import Link from 'next/link';

const Title = styled.h1`
    color: #2f5fd1;
`;

export default function LinkPage() {
    return (
        <div>
            <Title>Styled-components도 이제 쓸 줄 안다</Title>
            <Link href={`/posts/1`}>포스트 상세 페이지</Link>
        </div>
    );
}
