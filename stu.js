import React, { useState } from 'react';
import { CheckCircle, Lock, PlayCircle, ChevronLeft } from 'lucide-react'; // Assuming you use lucide-react or similar icons

// 1. Mock Data Setup
const courseChapters = [
  { id: 1, title: 'Getting Started', content: 'This is the beginning. We cover installation and setup.' },
  { id: 2, title: 'Variables', content: 'Learn about var, let, and const.' },
  { id: 3, title: 'Advanced Hooks', content: 'Deep dive into useEffect and useMemo.' },
  { id: 4, title: 'Global State', content: 'Managing state with Redux or Context.' },
];

const CoursePage = () => {
  // State to track which chapter is currently being viewed
  const [activeChapterId, setActiveChapterId] = useState(1);
  
  // State to track which chapters are finished (Start with none, or fetch from DB)
  const [completedChapters, setCompletedChapters] = useState([]);

  // --- CORE LOGIC START ---

  // Helper to check if a specific chapter is locked
  const isChapterLocked = (index) => {
    if (index === 0) return false; // First chapter is always unlocked
    
    // Check if the previous chapter ID is in the completed list
    const previousChapterId = courseChapters[index - 1].id;
    return !completedChapters.includes(previousChapterId);
  };

  // Handle clicking "Mark as Complete"
  const handleMarkAsComplete = () => {
    // 1. Add current chapter to completed list if not already there
    if (!completedChapters.includes(activeChapterId)) {
      setCompletedChapters([...completedChapters, activeChapterId]);
    }

    // 2. Automatically move to the next chapter (optional UX improvement)
    const currentIndex = courseChapters.findIndex(c => c.id === activeChapterId);
    if (currentIndex < courseChapters.length - 1) {
      setActiveChapterId(courseChapters[currentIndex + 1].id);
    }
  };

  // Handle clicking a sidebar item
  const handleChapterClick = (chapter, index) => {
    if (isChapterLocked(index)) return; // Do nothing if locked
    setActiveChapterId(chapter.id);
  };

  // --- CORE LOGIC END ---

  // Get current active chapter data
  const currentChapterData = courseChapters.find(c => c.id === activeChapterId);

  return (
    <div className="flex h-screen bg-black text-white font-sans">
      
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800 flex items-center gap-2">
           <span className="font-bold text-xl">LearnX Pro</span>
        </div>

        <div className="p-4">
          <div className="flex items-center text-gray-400 mb-4 cursor-pointer hover:text-white transition">
            <ChevronLeft size={16} /> <span className="ml-1">Back</span>
          </div>
          <h2 className="font-bold text-lg mb-4">Chapters</h2>
          
          <div className="space-y-2">
            {courseChapters.map((chapter, index) => {
              const locked = isChapterLocked(index);
              const completed = completedChapters.includes(chapter.id);
              const isActive = activeChapterId === chapter.id;

              return (
                <div 
                  key={chapter.id}
                  onClick={() => handleChapterClick(chapter, index)}
                  className={`
                    flex items-center justify-between p-3 rounded-md cursor-pointer transition-all
                    ${isActive ? 'bg-indigo-900 border-l-4 border-indigo-500' : 'hover:bg-gray-900'}
                    ${locked ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  <span className={`text-sm ${isActive ? 'text-white' : 'text-gray-400'}`}>
                    {index + 1}. {chapter.title}
                  </span>

                  {/* Icons: Lock, Check, or Empty */}
                  <div>
                    {locked ? (
                      <Lock size={14} className="text-gray-600" />
                    ) : completed ? (
                      <CheckCircle size={14} className="text-green-500" />
                    ) : (
                      isActive && <PlayCircle size={14} className="text-indigo-400"/>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <div className="max-w-3xl mx-auto">
            {/* Header Tabs */}
            <div className="flex gap-6 border-b border-gray-800 pb-4 mb-8 text-gray-400 text-sm">
                <span className="text-indigo-500 border-b-2 border-indigo-500 pb-4 px-2">Read</span>
                <span className="cursor-pointer hover:text-white transition">My Notes</span>
                <span className="cursor-pointer hover:text-white transition">Quiz</span>
            </div>

            <h1 className="text-3xl font-bold mb-6">
              {currentChapterData.id}. {currentChapterData.title}
            </h1>
            
            <p className="text-gray-300 mb-10 text-lg leading-relaxed">
              {currentChapterData.content}
            </p>

            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
               <p className="mb-4">Make sure you have VS Code installed.</p>
               
               {/* THE BUTTON */}
               <button 
                 onClick={handleMarkAsComplete}
                 disabled={completedChapters.includes(activeChapterId)}
                 className={`
                   px-6 py-2 rounded-md font-medium transition-colors flex items-center gap-2
                   ${completedChapters.includes(activeChapterId) 
                     ? 'bg-green-600 text-white cursor-default' 
                     : 'bg-indigo-600 hover:bg-indigo-700 text-white'}
                 `}
               >
                 {completedChapters.includes(activeChapterId) ? (
                    <>Completed <CheckCircle size={16}/></>
                 ) : (
                    "Mark as Complete"
                 )}
               </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;