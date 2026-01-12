
import React, { useState, useEffect } from 'react';
import { CloudService, SelectionItem } from './types';
import { INITIAL_SERVICES } from './constants';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ServiceSelector } from './components/ServiceSelector';
import { PricingConfig } from './components/PricingConfig';
import { getCloudInsights } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'config'>('calculator');
  const [services, setServices] = useState<CloudService[]>(INITIAL_SERVICES);
  const [selections, setSelections] = useState<SelectionItem[]>([]);
  const [aiInsights, setAiInsights] = useState<string>('');
  const [loadingInsights, setLoadingInsights] = useState<boolean>(false);
  
  // Auth state for Price Config
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [loginError, setLoginError] = useState<boolean>(false);

  // Persistence
  useEffect(() => {
    const savedServices = localStorage.getItem('huawei_cloud_prices');
    if (savedServices) {
      try {
        setServices(JSON.parse(savedServices));
      } catch (e) {
        console.error("Failed to load saved prices", e);
      }
    }
  }, []);

  const saveServices = (newServices: CloudService[]) => {
    setServices(newServices);
    localStorage.setItem('huawei_cloud_prices', JSON.stringify(newServices));
  };

  const handleUpdateServicePrice = (updated: CloudService) => {
    const nextServices = services.map(s => s.id === updated.id ? updated : s);
    saveServices(nextServices);
  };

  const handleAddSelection = (serviceId: string) => {
    setSelections(prev => {
        if (prev.some(s => s.serviceId === serviceId)) return prev;
        return [...prev, { serviceId, quantity: 1, months: 1 }];
    });
  };

  const handleUpdateSelection = (serviceId: string, quantity: number, months: number) => {
    setSelections(prev => prev.map(s => 
      s.serviceId === serviceId ? { ...s, quantity, months } : s
    ));
  };

  const handleRemoveSelection = (serviceId: string) => {
    setSelections(prev => prev.filter(s => s.serviceId !== serviceId));
  };

  const generateInsights = async () => {
    if (selections.length === 0) return;
    setLoadingInsights(true);
    const result = await getCloudInsights(selections, services);
    setAiInsights(result);
    setLoadingInsights(false);
  };

  const exportToCSV = () => {
    let csv = "Service,Category,Quantity,Duration (Mo),Unit Price,Subtotal\n";
    selections.forEach(sel => {
      const srv = services.find(s => s.id === sel.serviceId);
      if (srv) {
        const subtotal = srv.unitPrice * sel.quantity * sel.months;
        csv += `"${srv.name}","${srv.category}",${sel.quantity},${sel.months},${srv.unitPrice},${subtotal}\n`;
      }
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'huawei_cloud_estimate.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'Huawei@123') {
      setIsAuthorized(true);
      setLoginError(false);
      setPasswordInput('');
    } else {
      setLoginError(true);
    }
  };

  return (
    <div className="min-h-screen pb-12">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-slate-200 p-1 rounded-lg w-fit mb-8">
          <button 
            onClick={() => {
              setActiveTab('calculator');
              setLoginError(false);
            }}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === 'calculator' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Cost Calculator
          </button>
          <button 
            onClick={() => setActiveTab('config')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === 'config' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Unit Price Config
          </button>
        </div>

        {activeTab === 'calculator' ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Dashboard services={services} selections={selections} />
            
            <div className="flex items-center justify-between">
               <h2 className="text-2xl font-bold text-slate-800">Resource Planner</h2>
               <div className="flex space-x-3">
                 <button 
                   onClick={generateInsights}
                   disabled={loadingInsights || selections.length === 0}
                   className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   {loadingInsights ? (
                     <svg className="animate-spin h-4 w-4 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                   ) : (
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                     </svg>
                   )}
                   AI Architecture Advisor
                 </button>
                 <button 
                   onClick={exportToCSV}
                   className="flex items-center px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all shadow-sm"
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                   </svg>
                   Export CSV
                 </button>
               </div>
            </div>

            {aiInsights && (
              <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl animate-in slide-in-from-top-4 duration-300">
                <div className="flex items-center mb-4">
                  <span className="p-2 bg-blue-600 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.674M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </span>
                  <h3 className="text-lg font-bold text-blue-900">Meeza Cloud AI Insights</h3>
                </div>
                <div className="text-blue-800 prose prose-blue max-w-none whitespace-pre-line">
                  {aiInsights}
                </div>
              </div>
            )}

            <ServiceSelector 
              services={services} 
              selections={selections}
              onAdd={handleAddSelection}
              onUpdate={handleUpdateSelection}
              onRemove={handleRemoveSelection}
            />
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {!isAuthorized ? (
              <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200 mt-12">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Protected Section</h2>
                  <p className="text-slate-500 text-sm mt-2">Enter the administrator password to edit unit prices.</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <input 
                      type="password" 
                      placeholder="Password"
                      value={passwordInput}
                      onChange={(e) => {
                        setPasswordInput(e.target.value);
                        setLoginError(false);
                      }}
                      className={`w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 transition-all ${
                        loginError ? 'border-red-500 focus:ring-red-100' : 'border-slate-200 focus:ring-blue-100'
                      }`}
                      autoFocus
                    />
                    {loginError && <p className="text-red-500 text-xs mt-2 font-medium">Incorrect password. Please try again.</p>}
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-lg"
                  >
                    Authorize Access
                  </button>
                </form>
              </div>
            ) : (
              <div>
                <div className="flex justify-end mb-4">
                  <button 
                    onClick={() => setIsAuthorized(false)}
                    className="text-slate-400 hover:text-slate-600 text-sm flex items-center bg-slate-100 px-3 py-1 rounded-full transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Lock Session
                  </button>
                </div>
                <PricingConfig services={services} onUpdateService={handleUpdateServicePrice} />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;