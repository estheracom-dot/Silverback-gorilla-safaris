export default function BlogPage() {
    const posts = [
        {
            title: "Ultimate Guide to Gorilla Trekking in Bwindi",
            excerpt: "Everything you need to know before tracking mountain gorillas in Uganda.",
            image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e",
            date: "April 10, 2026"
        },
        {
            title: "5 Reasons Uganda is Better Than Kenya for Safari",
            excerpt: "Gorillas, cheaper permits, less crowds. Here's why you should choose the Pearl.",
            image: "https://images.unsplash.com/photo-1549366021-9f761d040a94",
            date: "April 5, 2026"
        },
        {
            title: "What to Pack for Your Uganda Safari",
            excerpt: "Don't forget these 10 essentials for gorilla trekking and game drives.",
            image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
            date: "March 28, 2026"
        }
    ]

    return (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
            <h1 className="text-3xl sm:text-5xl font-bold text-center mb-4">Silverback Blog</h1>
            <p className="text-center text-gray-600 mb-8 sm:mb-12 text-sm sm:text-base">Tips, Guides & Safari Stories</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {posts.map((post) => (
                    <div key={post.title} className="border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition flex flex-col">
                        <img src={post.image} alt={post.title} className="h-40 sm:h-48 w-full object-cover" />
                        <div className="p-4 sm:p-6 flex flex-col flex-1">
                            <p className="text-xs sm:text-sm text-gray-500 mb-2">{post.date}</p>
                            <h2 className="text-lg sm:text-xl font-bold mb-2">{post.title}</h2>
                            <p className="text-gray-700 mb-4 text-sm sm:text-base flex-1">{post.excerpt}</p>
                            <button className="text-green-700 font-semibold text-sm sm:text-base text-left">Read More →</button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}