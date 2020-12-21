type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createdAt?: Date;
}
type Tag = {
    id: string;
    name: string;
}
type TagListModel = {
    data: Tag[];
    fetch: () => Tag[];
    create: (name: string) => 'success' | 'duplicate'; //success 表示成功，duplicate 表示name重复    （联合类型）
    update: (id: string, name: string) => 'success' | 'not found' | 'duplicate';
    remove: (id: string) => boolean;
    save: () => void;
}

// interface Window {
// }