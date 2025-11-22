import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import EquipmentOverview from './EquipmentOverview';
import EquipmentManagement from './EquipmentManagementUI';
import MachinePage from './MachinePage';
import PerformanceGraphs from './PerformanceGraphs';
import MaintenanceSchedule from './MaintenanceSchedule';

import ServiceRecording from './ServiceRecording';
import ServiceHistory from './ServiceHistory';
import Reports from './Reports';
import QRScanner from './QRScanner';
import DailyLogs from './DailyLogs';
import MachineSelection from './MachineSelection';
import MachineRecording from './MachineRecording';

const Dashboard = () => {
  const [activeModule, setActiveModule] = useState('overview');
  const [serviceEquipmentId, setServiceEquipmentId] = useState(null);
  const [machineId, setMachineId] = useState(null);
  const [recordingMachineId, setRecordingMachineId] = useState(null);

  // Handle URL-based navigation for QR code scanning
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/service/')) {
        const equipmentId = path.split('/service/')[1];
        setServiceEquipmentId(equipmentId);
        setActiveModule('service-recording');
      } else if (path === '/qr-scanner') {
        setActiveModule('qr-scanner');
      } else if (path.startsWith('/machines/')) {
        const mId = path.split('/machines/')[1];
        setMachineId(mId);
        setActiveModule('machine-page');
      } else if (path.startsWith('/record/')) {
        const recordId = path.split('/record/')[1];
        setRecordingMachineId(parseInt(recordId));
        setActiveModule('machine-recording');
      } else if (path === '/record') {
        setActiveModule('machine-selection');
      }
    };

    // Check initial URL
    handlePopState();

    // Listen for browser back/forward
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);



  const renderContent = () => {
    switch (activeModule) {
      case 'overview':
        return <EquipmentOverview />;
      case 'equipment-management':
        return <EquipmentManagement />;
      case 'daily-logs':
        return <DailyLogs />;
      case 'qr-scanner':
        return <QRScanner />;
      case 'service-recording':
        return <ServiceRecording equipmentId={serviceEquipmentId} />;
      case 'service-history':
        return <ServiceHistory />;
      case 'performance':
        return <PerformanceGraphs />;
      case 'maintenance':
        return <MaintenanceSchedule />;
      
      case 'machine-page':
        return <MachinePage machineId={machineId} />;
      case 'machine-selection':
        return <MachineSelection />;
      case 'machine-recording':
        return <MachineRecording machineId={recordingMachineId} />;
      case 'reports':
        return <Reports />;
      default:
        return <EquipmentOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        activeModule={activeModule} 
        setActiveModule={setActiveModule}
      />
      <main className="pt-16 pb-8 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;