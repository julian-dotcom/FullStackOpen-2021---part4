const dummy = (blogs) => {
    return 1
}


const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => (acc + blog.likes), 0)
    //return result
}

const favoriteBlog = (blogs) => {
    let mostLikesIndex = mostLikes = 0
    blogs.forEach((blog, index) => {
        if (blog.likes > mostLikes) {
            mostLikes = blog.likes
            mostLikesIndex = index
        }
    })
    return blogs[mostLikesIndex]
}

const mostBlogs = (blogs) => {
    const allBloggers = {}
    blogs.forEach(blog => {
        if (!allBloggers.hasOwnProperty([blog.author])) {
            allBloggers[blog.author] = 1
        } else {
            allBloggers[blog.author]++
        }
    })
    let topBlogger = topBloggerPosts = 0
    Object.keys(allBloggers).forEach(blogger => {
        if (allBloggers[blogger] > topBloggerPosts) {
            topBlogger = blogger // equate name of top author to current author
            topBloggerPosts = allBloggers[blogger] // store how many posts top author has
        }
    })
    return { author: topBlogger, blogs: topBloggerPosts }
}

const mostLikedAuthor = (blogs) => {
    const allBloggers = {}
    blogs.forEach(blog => {
        if (!allBloggers.hasOwnProperty([blog.author])) {
            allBloggers[blog.author] = blog.likes
        } else {
            allBloggers[blog.author] += blog.likes
        }
    })
    let mostLikedBlogger = mostLikedBloggerLikes = 0    
    Object.keys(allBloggers).forEach(blogger => {
        if (allBloggers[blogger] > mostLikedBloggerLikes) {
            mostLikedBlogger = blogger // equate name of top author to current author
            mostLikedBloggerLikes = allBloggers[blogger] // store how many likes top author has
        }
    })
    return { author: mostLikedBlogger, likes: mostLikedBloggerLikes }
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikedAuthor
}

