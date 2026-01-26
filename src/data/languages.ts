export interface Language {
  id: string;
  nameKey: string;
  rating: 1 | 2 | 3 | 4 | 5;
  noteKey: string;
}

export const languages: Language[] = [
  {
    id: 'armenian',
    nameKey: 'armenian',
    rating: 5,
    noteKey: 'armenian'
  },
  {
    id: 'russian',
    nameKey: 'russian',
    rating: 4,
    noteKey: 'russian'
  },
  {
    id: 'english',
    nameKey: 'english',
    rating: 4,
    noteKey: 'english'
  }
];
