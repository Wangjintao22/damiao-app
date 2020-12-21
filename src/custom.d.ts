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

interface Window {
    tagList: Tag[];
    createTag: (name: string) => void;
    findTag: (id: string) => Tag | undefined;
    removeTag: (id: string) => boolean;
    updateTag: (id: string, name: string) => 'success' | 'not found' | 'duplicate';   //和上面的update类型一样，可以写成 TagListModel['update']
    recordList: RecordItem[];
    createRecord: (record: RecordItem) => void;
}