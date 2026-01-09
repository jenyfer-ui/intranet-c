import React, { useState, useEffect } from 'react';

// Components
import Sidebar from './src/components/Sidebar';
import Header from './src/components/Header';
import Dashboard from './src/pages/Dashboard';
import TeamDirectory from './src/pages/TeamDirectory';
import Projects from './src/pages/Projects';
import DocumentCenter from './src/pages/DocumentCenter';
import NewsAndEvents from './src/pages/NewsAndEvents';
import Login from './src/pages/Login';
import ResourcesByDepartment from './src/pages/ResourcesByDepartment';
import SettingsPage from './src/pages/Settings';
import NotificationsPanel from './src/components/NotificationsPanel';
import HelpWidget from './src/components/HelpWidget';
import ChatWidget from './src/components/ChatWidget';

// Data
import { allPeopleFlat } from './data/people';
import { projectsData } from './data/projects';
import { initialNotifications } from './data/notifications';
import { socialEventsData } from './data/socialEvents';
import { generateUserCredentials, authenticateUser, UserCredentials, auth } from './src/data/auth';

// DB
import { getAllDocuments, addDocuments, updateDocument, deleteDocument } from './utils/db';
import { loadFromLocalStorage, saveToLocalStorage } from './utils/storage';

// Types
import { 
  Project, 
  Document, 
  Notification, 
  SocialEvent, 
  ProjectStatus, 
  Person
} from './src/types';

function App() {
  // Auth state
  const [userCredentials] = useState<UserCredentials[]>(() => generateUserCredentials(allPeopleFlat));
  const [isLoggedIn, setIsLoggedIn] = useState(() => loadFromLocalStorage('isLoggedIn', false));
  const [currentUser, setCurrentUser] = useState<Person>(() => {
    const savedUser = loadFromLocalStorage('currentUser', null);
    return savedUser || allPeopleFlat[5] || {
      id: '1',
      name: 'Usuário',
      email: 'usuario@exemplo.com',
      role: 'Usuário',
      phone: '',
      avatarUrl: '',
      joinDate: new Date().toISOString(),
      status: 'online',
      department: 'TI Gerencial',
      birthDate: '1990-01-01',
      settings: {
        theme: 'light',
        language: 'pt-BR',
        timezone: 'America/Sao_Paulo',
        notifications: {
          email: true,
          push: true,
          desktop: true,
          mentions: true,
          news: true,
          updates: true
        },
        privacy: {
          showEmail: true,
          showPhone: false,
          showBirthday: true,
          showActivity: true,
          profileVisibility: 'public' as const
        }
      }
    };
  });

  // UI State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = loadFromLocalStorage('isDarkMode', null);
    // Default to light theme if no preference is saved
    return savedMode === null ? false : savedMode;
  });
  const [activePage, setActivePage] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [personToEdit, setPersonToEdit] = useState<Person | null>(null);

  // Data State
  const [people, setPeople] = useState<Person[]>(() => {
    return loadFromLocalStorage('people', allPeopleFlat);
  });
  
  const [projects, setProjects] = useState<Project[]>(() => 
    loadFromLocalStorage('projects', projectsData)
  );
  
  const [documents, setDocuments] = useState<Document[]>([]);
  
  const [notifications, setNotifications] = useState<Notification[]>(() => 
    loadFromLocalStorage('notifications', initialNotifications)
  );
  
  const [allEvents, setAllEvents] = useState<SocialEvent[]>(() => 
    loadFromLocalStorage('events', [...socialEventsData])
  );

  // Effects
  useEffect(() => {
    saveToLocalStorage('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);
  
  useEffect(() => {
    saveToLocalStorage('currentUser', currentUser);
  }, [currentUser]);

  useEffect(() => {
    // Remove todas as classes de tema primeiro
    document.documentElement.classList.remove('dark', 'light');
    
    // Adiciona a classe do tema atual
    const themeClass = isDarkMode ? 'dark' : 'light';
    document.documentElement.classList.add(themeClass);
    
    // Atualiza o tema no usuário atual mantendo todas as outras propriedades
    setCurrentUser(prev => ({
      ...prev,
      settings: {
        theme: themeClass,
        language: 'pt-BR',
        timezone: 'America/Sao_Paulo',
        notifications: {
          email: true,
          push: true,
          desktop: true,
          mentions: true,
          news: true,
          updates: true
        },
        privacy: {
          showEmail: true,
          showPhone: false,
          showBirthday: true,
          showActivity: true,
          profileVisibility: 'public' as const
        },
        ...prev.settings
      }
    }));
    
    // Salva a preferência
    saveToLocalStorage('isDarkMode', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    saveToLocalStorage('people', people);
  }, [people]);
  
  useEffect(() => {
    saveToLocalStorage('projects', projects);
  }, [projects]);
  
  useEffect(() => {
    saveToLocalStorage('notifications', notifications);
  }, [notifications]);
  
  useEffect(() => {
    saveToLocalStorage('events', allEvents);
  }, [allEvents]);
  
  useEffect(() => {
    const loadDocs = async () => {
      const docs = await getAllDocuments();
      setDocuments(docs);
    };
    loadDocs();
  }, []);

  // Handlers
  const handleDismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleDismissAllNotifications = () => {
    setNotifications([]);
  };

  const handleLogin = (user: any) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    setActivePage('Dashboard');
    return { success: true };
  };

  const authenticate = (username: string, password: string) => {
    if (username && password) {
      return { id: 1, username, name: 'Admin User', role: 'admin' };
    }
    return null;
  };

  const handleLoginWrapper = (userData: any) => {
    if (userData) {
      const user = allPeopleFlat.find(u => u.email === userData.email) || userData;
      setCurrentUser(user);
      setIsLoggedIn(true);
      return user;
    }
    return null;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    
    const defaultUser = allPeopleFlat[5] || {
      id: '1',
      name: 'Usuário',
      email: 'usuario@exemplo.com',
      role: 'Usuário',
      phone: '',
      avatarUrl: '',
      department: 'TI Gerencial',
      status: 'inactive',
      birthDate: '1990-01-01',
      joinDate: new Date().toISOString(),
      settings: {
        theme: 'light',
        language: 'pt-BR',
        timezone: 'America/Sao_Paulo',
        notifications: {
          email: true,
          push: true,
          desktop: true,
          mentions: true,
          news: true,
          updates: true
        },
        privacy: {
          showEmail: true,
          showPhone: false,
          showBirthday: true,
          showActivity: true,
          profileVisibility: 'public' as const
        }
      }
    };
    
    setCurrentUser(defaultUser);
    setActivePage('Dashboard');
    setIsSidebarOpen(false);
    setIsNotificationsOpen(false);
    setPersonToEdit(null);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(prev => 
      prev.map(p => p.id === updatedProject.id ? updatedProject : p)
    );
  };

  const handleAddDocument = (newDoc: Omit<Document, 'id'>) => {
    const docWithId: Document = {
      ...newDoc,
      id: Date.now()
    };
    setDocuments(prev => [...prev, docWithId]);
  };

  const handleDeleteDocument = async (id: number) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
    return Promise.resolve();
  };

  const handleAddEvent = (newEvent: Omit<SocialEvent, 'id'>) => {
    const eventWithId: SocialEvent = {
      ...newEvent,
      id: Date.now()
    };
    setAllEvents(prev => [...prev, eventWithId]);
  };

  const handleDeleteEvent = (id: number) => {
    setAllEvents(prev => prev.filter(event => event.id !== id));
  };

  const handleUpdateUser = (updatedUser: Person) => {
    setCurrentUser(updatedUser);
  };

  const renderPage = () => {
    if (!isLoggedIn) {
      return <Login onLogin={handleLogin} authenticate={authenticate} />;
    }
    
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard 
          currentUser={currentUser}
          setActivePage={setActivePage}
          people={people}
          setIsChatOpen={() => {}}
          events={allEvents}
          documents={documents}
          projects={projects}
          onAddProject={(newProject) => {
            setProjects(prev => [...prev, { ...newProject, id: Date.now(), progress: 0 }]);
          }}
        />;
      case 'Team Directory':
        return <TeamDirectory 
          people={people} 
          onEditPerson={setPersonToEdit}
          currentUser={currentUser}
        />;
      case 'Projects':
        return <Projects 
          projects={projects}
          people={people}
          onAddProject={(newProject) => {
            setProjects(prev => [...prev, { ...newProject, id: Date.now(), progress: 0 }]);
          }}
          onUpdateProject={handleUpdateProject}
          onUpdateProjectStatus={(projectId, newStatus) => {
            setProjects(prev => 
              prev.map(p => p.id === projectId ? { ...p, status: newStatus } : p)
            );
          }}
          currentUser={currentUser}
        />;
      case 'Document Center':
        return <DocumentCenter 
          documents={documents} 
          onAddDocuments={async (docs) => {
            setDocuments(prev => [...prev, ...docs]);
          }}
          onUpdateDocument={async (doc) => {
            setDocuments(prev => 
              prev.map(d => d.id === doc.id ? doc : d)
            );
          }}
          onDeleteDocument={handleDeleteDocument}
        />;
      case 'News & Events':
        return <NewsAndEvents 
          people={people}
          events={allEvents} 
          onAddEvent={handleAddEvent}
          currentUser={currentUser}
        />;
      case 'Resources':
        return <ResourcesByDepartment 
          people={people} 
          documents={documents}
          currentUser={currentUser}
        />;
      case 'Settings':
        return <SettingsPage 
          currentUser={currentUser}
          onUpdateUser={handleUpdateUser}
          onThemeToggle={() => setIsDarkMode(!isDarkMode)}
          isDarkMode={isDarkMode}
        />;
      default:
        return <Dashboard 
          currentUser={currentUser}
          setActivePage={setActivePage}
          people={people}
          setIsChatOpen={() => {}}
          events={allEvents}
          documents={documents}
          projects={projects}
          onAddProject={(newProject) => {
            setProjects(prev => [...prev, { ...newProject, id: Date.now(), progress: 0 }]);
          }}
        />;
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${isDarkMode ? 'dark' : ''}`}>
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        activePage={activePage}
        setActivePage={setActivePage}
        onLogout={handleLogout}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={activePage}
          onToggleNotifications={() => setIsNotificationsOpen(!isNotificationsOpen)}
          unreadCount={notifications.filter(n => !n.read).length}
          currentUser={currentUser}
          onEditUser={() => setPersonToEdit(currentUser)}
          onLogout={handleLogout}
          theme={isDarkMode ? 'dark' : 'light'}
          setTheme={(newTheme) => {
            const shouldBeDark = newTheme === 'dark';
            setIsDarkMode(shouldBeDark);
            
            setCurrentUser(prev => ({
              ...prev,
              settings: {
                theme: newTheme,
                language: 'pt-BR',
                timezone: 'America/Sao_Paulo',
                notifications: {
                  email: true,
                  push: true,
                  desktop: true,
                  mentions: true,
                  news: true,
                  updates: true
                },
                privacy: {
                  showEmail: true,
                  showPhone: false,
                  showBirthday: true,
                  showActivity: true,
                  profileVisibility: 'public' as const
                },
                ...prev.settings
              }
            }));
          }}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderPage()}
        </main>
        
        <NotificationsPanel 
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          notifications={notifications}
          onDismiss={handleDismissNotification}
          onDismissAll={handleDismissAllNotifications}
        />
        
        <HelpWidget onClose={() => {}} />
        <ChatWidget onClose={() => {}} />
      </div>
    </div>
  );
}

export default App;