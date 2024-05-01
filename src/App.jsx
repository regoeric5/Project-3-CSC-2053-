import { useState, useEffect } from 'react'

function App() {
	const Spanish = [
		{ Spanish: 'Yo', English: 'I' },
		{ Spanish: 'Tu', English: 'You' },
		{ Spanish: 'Nosotros', English: 'Us' },
		{ Spanish: 'El', English: 'He' },
		{ Spanish: 'Ella', English: 'She' },
		{ Spanish: 'Eso', English: 'This' },
		{ Spanish: 'Comer', English: 'to Eat' },
		{ Spanish: 'Ser', English: 'To be' },
		{ Spanish: 'Beber', English: 'to Drink' },
		{ Spanish: 'Hacer', English: 'To do' },
		{ Spanish: 'Gato', English: 'Cat' },
		{ Spanish: 'Hola', English: 'Hi' },
		{ Spanish: 'Bueno Noches', English: 'Good Night' },
		{ Spanish: 'Bueno Dia', English: 'Good Morning' },
		{ Spanish: 'Bueno Tardes', English: 'Good Afternoon' },
		{ Spanish: 'Jugar', English: 'to Play' },
		{ Spanish: 'Tener', English: 'To have' },
		{ Spanish: 'Saber', English: 'To know' },
		{ Spanish: 'Ingles', English: 'English' },
		{ Spanish: 'Espanol', English: 'Spanish' },
		{ Spanish: 'Cafe', English: 'Coffee' },
		{ Spanish: 'Agua', English: 'Water' },
		{ Spanish: 'Mesa', English: 'Table' },
		{ Spanish: 'Ojos', English: 'Eyes' },
		{ Spanish: 'Luz', English: 'Light' },
		{ Spanish: 'Teléfono', English: 'Phone' },
		{ Spanish: 'Bueno', English: 'Good' },
		{ Spanish: 'Amor', English: 'to love' },
		{ Spanish: 'Mi Amor', English: 'My Love' },
		{ Spanish: 'Computadora', English: 'Computer' },
		]

	const [input, setInput] = useState('')
	const [current, setCurrent] = useState(0)
	
	const [streak, setStreak] = useState(0)
	const [maxStreak, setMaxStreak] = useState(0)

	const [error, setError] = useState(false)

	const setRandomSpanish = () => {
		const randomIndex = Math.floor(Math.random() * Spanish.length)
		setCurrent(randomIndex)
	}

	const handleChange = (e) => {
		setInput(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		 
		if (input.toLowerCase() === Spanish[current].English.toLowerCase()) {
			setStreak(streak + 1)
			setMaxStreak(streak + 1 > maxStreak ? streak + 1 : maxStreak)
			setError(false)

			localStorage.setItem('streak', streak + 1)
			localStorage.setItem('maxStreak', streak + 1 > maxStreak ? streak + 1 : maxStreak)
		} else {
			const h = Spanish[current].Spanish
			const r = Spanish[current].English
			setError(`Wrong! The correct answer for ${h} is ${r}`)
			setStreak(0)
			localStorage.setItem('streak', 0)
		}

		setInput('')
		setRandomSpanish()
	}

	useEffect(() => {
		setRandomSpanish()
		setStreak(parseInt(localStorage.getItem('streak')) || 0)
		setMaxStreak(parseInt(localStorage.getItem('maxStreak')) || 0)
	}, [])

	return (
		<div className="min-h-screen text-white text-center" style={{backgroundImage:`url("wallpaper.jpg")`,backgroundSize: '100% 100%'}}>
			<header className="p-6 mb-8">
				<h1 className="text-2xl font-bold uppercase" style={{ color: 'white' }}>Spanish Quiz</h1>
				<div>
					<p style={{ color: 'white' }}>{streak} / {maxStreak}</p>
				</div>
			</header>

			<div className="text-9xl font-bold mb-8">
				<p style={{ color: 'white' }}>{Spanish[current].Spanish}</p>
			</div>

			<div className="mb-8">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						onChange={handleChange}
						value={input}
						className="block w-100 bg-transparent border-b-2 border-b-green mx-auto outline-none text-center text-6xl pb-2" />
				</form>
			</div>
			{error && 
				<div>
					<p style={{ color: 'red' }}> { error }</p>
				</div>
			}
		</div>
	)
}

export default App
