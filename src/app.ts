showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
  const elt = document.getElementById(divName);
  elt!.innerText = `Hello from ${name}`;
}

/**
 * Task 02.01
 */
enum Category {
  JavaScript,
  CSS,
  Angular,
};

type Book = {
  id: number;
  title: string;
  category: Category;
  author: string;
  available: boolean;
};

function getAllBooks(): readonly Book[] {
  const books = <const>[
    {
      id: 1,
      title: 'Refactoring JavaScript',
      category: Category.JavaScript,
      author: 'Evan Burchard',
      available: true,
    },
    {
      id: 2,
      title: 'JavaScript Testing',
      category: Category.JavaScript,
      author: 'Liang Yuxian Eugene',
      available: false,
    },
    {
      id: 3,
      title: 'CSS Secrets',
      category: Category.CSS,
      author: 'Lea Verou',
      available: true,
    },
    {
      id: 4,
      title: 'Mastering JavaScript Object-OrientedProgramming',
      category: Category.JavaScript,
      author: 'Andrea Chiarelli',
      available: true,
    },
  ];

  return books;
}

function logFirstAvailable(books: readonly Book[] = getAllBooks()): void {
  const numberOfBooks = books.length;
  const title = books.find(book => book.available)?.title;

  console.log('Total number of books:', numberOfBooks);
  console.log('First available title:', title);
}

function getBookTitlesByCategory(category: Category): string[] {
  const books = getAllBooks();

  return books.filter(book => book.category === category).map(({ title }) => title);
}

function logBookTitles(titles: string[]) {
  titles.forEach(console.log);
}

function getBookAuthorByIndex(index: number): [title: string, author: string] {
  const books = getAllBooks();
  const { title, author } = books[index] ?? {} as Book;

  return [title, author];
}

function calcTotalPages(): bigint {
  const data = [
    { lib: 'libName', books: 1_000_000_000, avgPagesPerBook: 250 },
    { lib: 'libName', books: 5_000_000_000, avgPagesPerBook: 300 },
    { lib: 'libName', books: 3_000_000_000, avgPagesPerBook: 280 },
  ];

  return data.reduce((pages, { books, avgPagesPerBook }) => pages + BigInt(books) * BigInt(avgPagesPerBook), 0n);
}

console.group('Unit 1.');

console.groupCollapsed('Library');
console.log(getAllBooks());
console.groupEnd();

console.groupCollapsed('First available');
logFirstAvailable(getAllBooks());
console.groupEnd();

console.groupCollapsed('Books by category:');
logBookTitles(getBookTitlesByCategory(Category.JavaScript));
logBookTitles(getBookTitlesByCategory(Category.CSS));
logBookTitles(getBookTitlesByCategory(Category.Angular));
console.groupEnd();

console.groupCollapsed('Books by index:');
console.log(getBookAuthorByIndex(0));
console.groupEnd();

console.log('Total page number for all libraries', calcTotalPages());

console.groupEnd();

// const myID: string =
function getID(name: string, key: number): string {
  return `${name}_${key}`;
}

type GetID = typeof getID;

function createCustomer(name: string, age?: number, city?: string) {
  console.groupCollapsed('Create customer');
  console.log('Customer name:', name);
  if (age) console.log('Age:', age);
  if (city) console.log('City:', city);
  console.groupEnd();
}

function getBookByID(id: number): Book | undefined {
  const books = getAllBooks();
  return books.find(({ id: bookID })=> bookID === id );
}

function checkoutBooks(customer: string, ...bookIDs: number[]): string[] {
  console.log('Customer name:', customer);

  return bookIDs
    .map(id => getBookByID(id))
    .filter(book => book?.available)
    .map(book => book!.title);
}

console.groupCollapsed('Task 3.02');
createCustomer('Anna');
createCustomer('Anna', 18);
createCustomer('Anna', 18, 'Vilnius');

getBookByID(1);

console.groupEnd();

console.groupCollapsed('Task 3.');
/* eslint-disable no-redeclare */
function getTitles(author: string): string [];
function getTitles(available: boolean): string [];
function getTitles(id: number, available: boolean): string [];
function getTitles(...args: [string| boolean] | [number, boolean]): string [] {
  const books = getAllBooks();

  if (args.length === 2) {
    const [id, available] = args;
    return books
      .filter(book => book.available && book.id === id)
      .map(({ title }) => title);
  }

  const [arg] = args;
  if (typeof arg === 'string') {
    return books
      .filter(book => book.author === arg)
      .map(({ title }) => title);
  }

  return books
    .filter(({ available }) => available)
    .map(({ title }) => title);
};
getTitles(1, true);
console.groupEnd();

function assertString(value: unknown): asserts value is string {
  if (typeof value !== 'string')
    throw new TypeError('Value should be a string');
}

function transformBookTitle(title: unknown) {
  assertString(title);

  return [...title].reverse().join('');
}
console.log(transformBookTitle('TypeScript'));
// console.log(transformBookTitle(123));

/**
 * Lesson 5
 */
console.groupCollapsed('Unit 5.');
abstract class ReferenceItem {
  static department: string = 'Classical Dep.';
  // title: string;
  // year: number;
  // year: number | undefined;
  // year?: number;
  // year!: number;
  /* eslint-disable no-underscore-dangle */
  private _publisher: string = '';

  get publisher(): string {
    return this._publisher.toUpperCase();
  }
  set publisher(newPublisher: string) {
    this._publisher = newPublisher;
  }

  #id: number;

  // constructor(newTitle: string, newYear: number) {
  constructor(id: number, public title: string, protected year: number) {
    console.log('Creating a new ReferenceItem...');
    // this.title = newTitle;
    // this.year = newYear;
    this.#id = id;
  }

  getId(): number {
    return this.#id;
  }

  printItem(): void {
    console.log(`${this.title} was published in ${this.year}`);
    console.log(`Department: ${ReferenceItem.department}`);
    // console.log(`Department: ${Object.getPrototypeOf(this).constructor.department}`);
    // this.constructor.prototype.department
  }

  abstract printCitation(): void;
}

// const ref = new ReferenceItem(1, 'Learn TypeScript', 2023);
// ref.printItem();
// ref.publisher = 'Foo';
// console.log(ref.publisher);
// console.log('ID:', ref.getId());
// console.log('ref = ', ref);

// class ReferenceItem {
//   title: string;
//   year: number;

//   constructor(title?: string) {
//     this.title = title ?? '';
//   }
//   printItem(): void {}
// }

// class Journal extends ReferenceItem {
//   contributors: string[];
//   issueNumber: number;

//   constructor(title: string) {
//     super(title);
//   }

//   override printItem(): void {
//     super.printItem();
//   }
// }

class Encyclopedia extends ReferenceItem  {
  constructor(id: number, title: string, year: number, public edition: number) {
    super(id, title, year);
  }

  override printItem(): void {
    super.printItem();
    console.log(`Edition: ${this.edition} (${this.year})`);
  }
  override printCitation(): void {
    console.log('Lorem ipsum dolor sit amet...');
  }
}

const refBook = new Encyclopedia(1, 'Learn TypeScript', 2023, 3);
console.log('refBook', refBook);
refBook.printItem();

interface BookInterface {
  title: string;
  author: string;
  pages: number;
}
interface  BookConstructorInterface {
  new (title: string, author: string, pages: number): BookInterface;
}

interface Person {
  name: string;
  email: string;
}

interface Author extends Person {
  numBooksPublished: number;
}

interface Librarian extends Person {
  department: string;
  assistCustomer: (customerName: string, bookTitle: string) => void;
}

class UniversityLibrarian implements Librarian {
  name!: string;
  email!: string;
  department!: string;

  assistCustomer(customerName: string, bookTitle: string): void {
    console.log(`${this.name} is assisting ${customerName} with the book ${bookTitle}`);
  }
}

const favoriteLibrarian: Librarian = new UniversityLibrarian();
favoriteLibrarian.name = 'Boris';
favoriteLibrarian.assistCustomer('Anna', 'Learn TypeScript');
console.log(favoriteLibrarian);

class MyBook {
  kind = 'book';
  title = 'Learn TypeScript';
  author = 'John Smith';
}

class MyMagazine {
  kind = 'magazine';
  title = 'Software Development';
}

function getMy(): MyBook | MyMagazine {
  return Math.random() > .5 ? new MyBook() : new MyMagazine();
}

function isMyBook(obj: MyBook | MyMagazine): obj is MyBook {
  return (<MyBook>obj).author !== undefined;
}

type MyBookOrMagazine = {
  kind: 'book';
  title: string;
  author: string;
} | {
  kind: 'magazine';
  title: string;
};

const my1 = { kind: 'book' } as MyBookOrMagazine;
// const my2 = { kind: 'book' } satisfies MyBookOrMagazine;

console.groupEnd();
