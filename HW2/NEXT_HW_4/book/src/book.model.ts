export interface BookDto {
  id: string;
  title: string;
  author: string;
  createdDt?: Date;
  isAvailable: boolean;
}
