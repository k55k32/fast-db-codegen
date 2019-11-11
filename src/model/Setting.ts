export default interface Setting {
    /** 写入模式
     * 默认: 新建文件，如已存在则忽略
     * append: 追加内容
     * overwrite: 如已存在，删除原来的
     */
    mode?: 'append' | 'overwrite'
}