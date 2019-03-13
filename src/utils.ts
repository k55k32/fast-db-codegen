export function javaTypeToJavaScript(type: string) {
    const javaTypeMap = {
        'integer': 'number',
        'array': '[]',
        'varchar': 'string',
        'bigint': 'number',
        'longtext': 'string',
        'datetime': 'number',
        'int': 'number',
        'tinyint': 'number',
        'decimal': 'number',
        'double': 'number',
        'smallint': 'number',
        'bit': 'number',
        'timestamp': 'number',
        'text': 'string',
        'char': 'string',
        'blob': 'number',
        'float': 'number',
        'time': 'number',
        'date': 'number',
    }
    return javaTypeMap[type] || 'string'
}
