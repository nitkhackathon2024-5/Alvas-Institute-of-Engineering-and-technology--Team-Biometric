document.getElementById('lesson-form').addEventListener('submit', async function (e) {
    e.preventDefault()
  
    const content = document.getElementById('content').value

    const quizQuestions = Array.from(document.querySelectorAll('.quiz-question')).map(q => ({
      question: q.querySelector('[name="question"]').value,
      options: q.querySelector('[name="options"]').value.split(','),
      answer: q.querySelector('[name="answer"]').value
    }))
  
    try {
      const response = await fetch('http://localhost:5000/admin/add-', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lessonData)
      })
      const result = await response.json()
      alert(result.message)
    } catch (error) {
      console.error('Error:', error)
    }
  })
  