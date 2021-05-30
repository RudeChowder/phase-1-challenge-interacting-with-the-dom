document.addEventListener('DOMContentLoaded', () => {
    const counter = document.querySelector('#counter')
    const minus = document.querySelector('#minus')
    const plus = document.querySelector('#plus')
    const heart = document.querySelector('#heart')
    const pause = document.querySelector('#pause')
    const form = document.querySelector('#comment-form')
    const commentInput = document.querySelector('#comment-input')
    const submit = document.querySelector('#submit')
    const comments = document.querySelector('#list')

    const likesList = document.querySelector('.likes')
    const currentLikes = []

    const incrementCounter = () => {counter.textContent =  parseInt(counter.textContent, 10) + 1}
    const decrementCounter = () => {counter.textContent =  parseInt(counter.textContent, 10) - 1}
    
    //starts the timer on page load
    let timer = setInterval( incrementCounter, 1000)

    plus.addEventListener('click', incrementCounter)
    minus.addEventListener('click', decrementCounter)

    // handles the like tracking
    heart.addEventListener('click', () => {
        const currentCount = parseInt(counter.textContent)
        const exisitingLike = currentLikes.find( like => like.num === currentCount)
        // if the number hasn't been liked, create a new like object to
        // track the number of likes for it, then add a new html element for the like
        if (!exisitingLike){
            const likeObject = {num: currentCount, likeCount: 1}
            currentLikes.push(likeObject)
            const newLikeElement = document.createElement('li')
            newLikeElement.className = 'like'
            newLikeElement.id = `${currentCount}`
            likeObject.element = newLikeElement
            newLikeElement.textContent = `${currentCount} has been liked ${likeObject.likeCount} time`
            likesList.append(newLikeElement)
        // if the like already exists, just update the object and related html
        } else {
            exisitingLike.likeCount++
            exisitingLike.element.textContent = `${exisitingLike.num} has been liked ${exisitingLike.likeCount} times`
        }
    })

    pause.addEventListener('click', () => {
        if (pause.textContent === ' pause '){
            clearInterval(timer)
            plus.disabled = true
            minus.disabled = true
            heart.disabled = true
            submit.disabled = true
            pause.textContent = ' resume '
        } else if (pause.textContent === ' resume '){
            timer = setInterval( incrementCounter, 1000)
            plus.disabled = false
            minus.disabled = false
            heart.disabled = false
            submit.disabled = false
            pause.textContent = ' pause '
        }
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        if (commentInput.value.trim() !== '') {
            const newComment = document.createElement('li')
            newComment.className = 'comment'
            newComment.textContent = commentInput.value
            commentInput.value = ''
            comments.append(newComment)
        }
    })
})