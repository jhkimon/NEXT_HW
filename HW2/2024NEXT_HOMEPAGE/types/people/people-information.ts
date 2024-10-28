import { StaticImageData } from 'next/image';

export interface PEOPLE_INFORMATION_TYPE {
    gen: number;
    name: string;
    department: string;
    classOf: number;
    imgSrc: string;
    masterDegree?: string;
    secondMajor?: string;
    managementTeam: string;
    intro?: string;
    email?: string;
    birthday?: string;
    career?: CareerEntry[];
    tools?: string[];
    skills?: string[];
    instagram?: string;
    linkedin?: string;
}

export interface CareerEntry {
    role: string;
    startDate: string;
    endDate: string;
}
