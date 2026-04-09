import { useState, useEffect } from 'react'
import Calendar from './components/Calendar'
import Notes from './components/Notes'
import './index.css'

function App() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null })
  
  // Try to load notes from local storage, otherwise use default
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('calendar-notes')
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  // Save notes to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('calendar-notes', JSON.stringify(notes))
  }, [notes])

  // Get active month identifier (e.g., "2023-10") for generic month notes
  const activeMonthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`
  
  // Selection logic for calendar date range
  const handleDateSelect = (date) => {
    const { start, end } = selectedRange

    if (!start || (start && end)) {
      // Start a new range
      setSelectedRange({ start: date, end: null })
    } else {
      // Complete the range (ensure start is before end)
      if (date < start) {
        setSelectedRange({ start: date, end: start })
      } else {
        setSelectedRange({ start: start, end: date })
      }
    }
  }

  // Update notes
  const handleNoteUpdate = (key, text) => {
    setNotes(prev => ({
      ...prev,
      [key]: text
    }))
  }

  // Find out what to show in the notes panel based on selection
  let activeNotesKey = activeMonthKey
  let activeNotesTitle = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })
  
  if (selectedRange.start && selectedRange.end) {
    // Both start and end selected
    const startStr = selectedRange.start.toLocaleDateString()
    const endStr = selectedRange.end.toLocaleDateString()
    if (startStr === endStr) {
      activeNotesKey = `date-${startStr}`
      activeNotesTitle = startStr
    } else {
      activeNotesKey = `range-${startStr}-${endStr}`
      activeNotesTitle = `${startStr} - ${endStr}`
    }
  } else if (selectedRange.start) {
    // Only start selected
    const startStr = selectedRange.start.toLocaleDateString()
    activeNotesKey = `date-${startStr}`
    activeNotesTitle = startStr
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Wall Calendar</h1>
      </header>
      
      <main className="calendar-layout">
        <div className="calendar-section">
          <Calendar 
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            selectedRange={selectedRange}
            onDateSelect={handleDateSelect}
          />
        </div>
        
        <aside className="notes-section">
          <Notes 
            noteKey={activeNotesKey}
            title={activeNotesTitle}
            content={notes[activeNotesKey] || ''}
            onUpdate={handleNoteUpdate}
          />
        </aside>
      </main>
    </div>
  )
}

export default App
