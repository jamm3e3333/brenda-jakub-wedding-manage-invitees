export abstract class BaseApplicationError implements Error {
    abstract name: string;
    abstract message: any;
    abstract statusCode: number;
}
