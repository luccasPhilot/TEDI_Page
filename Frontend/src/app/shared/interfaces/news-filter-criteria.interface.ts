export interface INewsFilterCriteria {
    title?: string;
    draft?: boolean | null;
    startDate?: string;
    endDate?: string;
    categoryId?: string | null;
    orderBy?: 'title' | 'creation_date';
    draftPriority?: 'first' | 'last' | null;
}
