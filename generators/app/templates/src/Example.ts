export class Example {
    private name: string;

    constructor(name: string) {
        this.setName(name);
    }

    private setName(name: string) {
        this.name = name;
    }

    public sayHello() {
        return `Hello ${this.name}!`;
    }
}
