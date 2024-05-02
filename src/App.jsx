import { useState, useEffect } from 'react';

function App() {
  const languages = { 
    Spanish: [
      { Word: 'Yo', English: 'I' },
			{ Word: 'Tu', English: 'You' },
			{ Word: 'Nosotros', English: 'Us' },
			{ Word: 'El', English: 'He' },
			{ Word: 'Ella', English: 'She' },
			{ Word: 'Eso', English: 'This' },
			{ Word: 'Comer', English: 'to Eat' },
			{ Word: 'Ser', English: 'To be' },
			{ Word: 'Beber', English: 'to Drink' },
			{ Word: 'Hacer', English: 'To do' },
			{ Word: 'Gato', English: 'Cat' },
			{ Word: 'Hola', English: 'Hi' },
			{ Word: 'Bueno Noches', English: 'Good Night' },
			{ Word: 'Bueno Dia', English: 'Good Morning' },
			{ Word: 'Bueno Tardes', English: 'Good Afternoon' },
			{ Word: 'Jugar', English: 'to Play' },
			{ Word: 'Tener', English: 'To have' },
			{ Word: 'Saber', English: 'To know' },
			{ Word: 'Ingles', English: 'English' },
			{ Word: 'Espanol', English: 'Spanish' },
			{ Word: 'Cafe', English: 'Coffee' },
			{ Word: 'Agua', English: 'Water' },
			{ Word: 'Mesa', English: 'Table' },
			{ Word: 'Ojos', English: 'Eyes' },
			{ Word: 'Luz', English: 'Light' },
			{ Word: 'Teléfono', English: 'Phone' },
			{ Word: 'Bueno', English: 'Good' },
			{ Word: 'Amor', English: 'to love' },
			{ Word: 'Mi Amor', English: 'My Love' },
			{ Word: 'Computadora', English: 'Computer' },
    ],
    French: [
      { Word: 'Je', English: 'I' },
			{ Word: 'Cheval', English: 'Horse' },
			{ Word: 'Bonjour', English: 'Hello' },
			{ Word: 'Chien', English: 'Dog' },
			{ Word: 'Au revoir', English: 'Goodbye' },
			{ Word: 'Oui', English: 'Yes' },
			{ Word: 'Merci', English: 'Thank you' },
			{ Word: 'Fille', English: 'Girl' },
			{ Word: 'Homme', English: 'Man' },
			{ Word: 'Femme', English: 'Woman' },
			{ Word: 'Je suis un chat', English: 'I am a cat' },
			{ Word: 'Cheval', English: 'Horse' },
			{ Word: 'Lapin', English: 'Rabbit' },
			{ Word: 'Chat', English: 'Cat' },
			{ Word: 'Tortue', English: 'Turtle' },
			{ Word: 'Parle', English: 'Speak' },
    ],
    German: [
      { Word: 'Danke', English: 'Thank you' },
			{ Word: 'Bitteschön', English: 'You are welcome' },
			{ Word: 'Bitte', English: 'Pardon' },
			{ Word: 'Ja', English: 'Yes' },
			{ Word: 'Nein', English: 'No' },
			{ Word: 'Hallo', English: 'Hello' },
			{ Word: 'Auf Wiedersehen', English: 'Goodbye' },
			{ Word: 'Katze', English: 'Cat' },
			{ Word: 'Hund', English: 'Dog' },
			{ Word: 'Kaninchen', English: 'Rabbit' },
			{ Word: 'Ratte', English: 'Rat' },
			{ Word: 'Maus', English: 'Mouse' },
			{ Word: 'Papagei', English: 'Parrot' },
			{ Word: 'Goldfisch', English: 'Goldfish' },
			{ Word: 'Kuh', English: 'Cow' },
			{ Word: 'Schwein', English: 'Pig' },
    ],
  };

  const [language, setLanguage] = useState('Spanish');
  const [input, setInput] = useState('');
  const [current, setCurrent] = useState(0); // Set a default value for current
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [error, setError] = useState(false);
  const backgroundImages = {
    Spanish: 'wallpaper.jpg',
    French: 'wallpaperFrench.jpg',
    German: 'wallpaperGerman.jpg',
    // Add more languages and their background images as needed
  };
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    setBackgroundImage(backgroundImages[language]);
  }, [language]);

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setBackgroundImage(backgroundImages[selectedLanguage]);
  };

  const setRandomWord = () => {
    const words = languages[language];
    if (words) {
      const randomIndex = Math.floor(Math.random() * words.length);
      setCurrent(randomIndex);
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const words = languages[language];
    if (!words) return; // Handle case where language not found

    const currentWord = words[current];
    if (!currentWord) return; // Handle case where current word not found

    if (input.toLowerCase() === currentWord.English.toLowerCase()) {
      setStreak(streak + 1);
      setMaxStreak((prevMaxStreak) => Math.max(streak + 1, prevMaxStreak));
      setError(false);

      localStorage.setItem('streak', streak + 1);
      localStorage.setItem('maxStreak', Math.max(streak + 1, maxStreak));
    } else {
      setError(`Wrong! The correct answer for ${currentWord.Word} is ${currentWord.English}`);
      setStreak(0);
      localStorage.setItem('streak', 0);
    }

    setInput('');
    setRandomWord();
  };

  useEffect(() => {
    setRandomWord();
    setStreak(parseInt(localStorage.getItem('streak')) || 0);
    setMaxStreak(parseInt(localStorage.getItem('maxStreak')) || 0);
  }, [language]);

  useEffect(() => {
    setStreak(0); // Reset streak when language changes
    localStorage.setItem('streak', 0);
  }, [language]);

  return (
    <div className="min-h-screen text-white text-center" style={{backgroundImage:`url(${backgroundImage})`,backgroundSize: '100% 100%'}}>
      <header className="p-6 mb-8 flex justify-between items-center">
        <select value={language} onChange={(e) => handleLanguageChange(e.target.value)} className="text-black bg-white px-2 py-1 rounded-md">
          {Object.keys(languages).map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
        <h1 className="text-2xl font-bold uppercase" style={{ color: 'white' }}>Language Vocab Game</h1>
        <div className="text-center">
          <p style={{ color: 'white' }}>Streak: {streak}</p>
          <p style={{ color: 'white' }}>Max Streak: {maxStreak}</p>
        </div>
      </header>

      <div className="text-9xl font-bold mb-8">
        <p style={{ color: 'white' }}>{languages[language]?.[current]?.Word}</p>
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
  );
}

export default App;