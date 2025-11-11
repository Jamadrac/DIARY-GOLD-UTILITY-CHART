import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import EquipmentOverview from './EquipmentOverview';
import EquipmentManagement from './EquipmentManagementUI';
import MachinePage from './MachinePage';
import PerformanceGraphs from './PerformanceGraphs';
import MaintenanceSchedule from './MaintenanceSchedule';
import EquipmentDetails from './EquipmentDetails';
import ServiceRecording from './ServiceRecording';
import ServiceHistory from './ServiceHistory';
import Reports from './Reports';
import QRScanner from './QRScanner';

const Dashboard = ({ user, onLogout }) => {
  const [activeModule, setActiveModule] = useState('overview');
  const [serviceEquipmentId, setServiceEquipmentId] = useState(null);
  const [machineId, setMachineId] = useState(null);

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
      case 'equipment-details':
        return <EquipmentDetails />;
      case 'machine-page':
        return <MachinePage machineId={machineId} />;
      case 'reports':
        return <Reports />;
      default:
        return <EquipmentOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        user={user} 
        activeModule={activeModule} 
        setActiveModule={setActiveModule}
        onLogout={onLogout}
      />
      <main className="pt-16">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;