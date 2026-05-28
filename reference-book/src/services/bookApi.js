export const searchBooks = async (query, type = 'concept') => {
    let searchQuery = query;
    if (type === 'author') {
        searchQuery = `inauthor:${query}`;
    }
    
    try {
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&maxResults=24`
        );
        const data = await response.json();
        
        if (!data.items) return [];
        
        return data.items.map(book => {
            const info = book.volumeInfo;
            return {
                id: book.id,
                title: info.title || "Untitled",
                authors: info.authors || ["Unknown Author"],
                description: info.description || "No description available",
                publisher: info.publisher || "-",
                publishedDate: info.publishedDate || "-",
                thumbnail: info.imageLinks?.thumbnail?.replace('http://', 'https://') || null,
                previewLink: info.previewLink || "#"
            };
        });
    } catch (error) {
        console.error('API Error:', error);
        return [];
    }
};