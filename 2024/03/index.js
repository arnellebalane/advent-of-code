export class MemoryReader {
    data = undefined;
    cursor = 0;

    constructor(data) {
        this.data = data;
    }

    readNext(count = 1) {
        let buffer = '';
        while (!this.isEmpty() && count-- > 0) {
            buffer += this.data[this.cursor++];
        }
        return buffer;
    }

    peekNext(count = 1) {
        let buffer = '';
        let cursor = this.cursor;
        while (!this.isEmpty() && count-- > 0) {
            buffer += this.data[cursor++];
        }
        return buffer;
    }

    readUntil(characters) {
        let buffer = '';
        while (!this.isEmpty() && !characters.includes(this.data[this.cursor])) {
            buffer += this.data[this.cursor++];
        }
        return buffer;
    }

    readWhile(predicate) {
        let buffer = '';
        while (!this.isEmpty() && predicate(this.data[this.cursor])) {
            buffer += this.data[this.cursor++];
        }
        return buffer;
    }

    isEmpty() {
        return this.cursor === this.data.length;
    }
}
