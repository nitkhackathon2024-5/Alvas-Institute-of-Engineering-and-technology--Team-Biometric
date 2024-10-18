
  async function fetchLessons() {
    try {
      const response = await axios.get('http://localhost:3000/lessons') // Adjust the URL based on your setup
      const lessons = response.data // Axios automatically parses JSON

      const lessonsContainer = document.getElementById('lessons-container')
      lessonsContainer.innerHTML = '' // Clear existing content

      lessons.forEach(lesson => {
        const lessonElement = document.createElement('div')
        lessonElement.className = 'lesson'

        lessonElement.innerHTML = `
          <h2>${lesson.title}</h2>
          <p>${lesson.content}</p>
        `
        lessonsContainer.appendChild(lessonElement)
      })
    } catch (error) {
      console.error('Error fetching lessons:', error)
    }
  }

  fetchLessons() // Call the function to fetch lessons when the page loads

