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

function logFirstAvailable(books: readonly Book[]): void {
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
