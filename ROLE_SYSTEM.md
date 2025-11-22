# Equipment Management Dashboard - User Role System

## User Roles & Permissions

This application implements a comprehensive role-based access control system with four distinct user types:

### 1. Technical Manager
**Full System Access**
- ✅ Add new machines
- ✅ Delete machines
- ✅ Record daily logs
- ✅ Record maintenance activities
- ✅ View all reports
- ✅ View performance analytics
- ✅ Access all features

### 2. Supervisor
**Management Access (No Maintenance Recording)**
- ✅ Add new machines
- ✅ Delete machines
- ✅ Record daily logs
- ❌ Record maintenance activities (Technician only)
- ✅ View all reports
- ✅ View performance analytics

### 3. Operator
**Daily Operations Access**
- ❌ Add/Delete machines
- ✅ Record daily logs
- ❌ Record maintenance activities
- ❌ View management reports
- ✅ View performance analytics
- 📋 Focus: Daily equipment monitoring and logging

### 4. Technician
**Maintenance & Operations Access**
- ❌ Add/Delete machines
- ✅ Record daily logs
- ✅ Record maintenance activities (Exclusive access)
- ❌ View management reports
- ✅ View performance analytics
- 🔧 Focus: Equipment maintenance and daily monitoring

## Features by Role

### Authentication System
- Role selection during login
- Persistent user sessions (localStorage)
- Context-based permission checking
- Dynamic navigation based on permissions

### Navigation & UI
- **All Users**: Overview (with Equipment Details), Service History, Maintenance Schedule
- **Technical Manager & Supervisor**: Equipment Management, Reports
- **Operator & Technician**: Machine Recording (includes Daily Logs and Performance Graphs)
- **Technician Only**: Maintenance Recording

### Daily Logs System
- Available to: Operators and Technicians
- Record daily equipment readings
- Equipment-specific parameter forms
- Historical log viewing
- Real-time validation and data storage

### Maintenance Recording
- **Exclusive to Technicians only**
- Comprehensive service recording
- Equipment parameter tracking
- Work performed documentation
- Service history integration

### Equipment Management
- **Technical Manager & Supervisor only**
- Add new equipment with custom parameters
- Edit equipment configurations
- Delete equipment (with confirmation)
- QR code generation for equipment
- Parameter template system

## How to Use

### Getting Started
1. **Login**: Select your role from the dropdown (Technical Manager, Supervisor, Operator, or Technician)
2. **Navigation**: The navbar will show only the features available to your role
3. **Role Display**: Your current role is shown in the profile section

### For Operators
1. Go to "Daily Logs" section
2. Select equipment from dropdown
3. Fill in required parameters
4. Add notes if needed
5. Submit daily readings

### For Technicians
1. **Daily Logs**: Same as operators
2. **Maintenance Recording**: Access through "Maintenance Recording" in navigation
3. Record detailed maintenance work
4. Document parts replaced, repairs performed
5. Update service history

### For Supervisors & Technical Managers
1. **Equipment Management**: Add/edit/delete equipment
2. **Reports**: View comprehensive system reports
3. **Daily Logs**: Can also record daily readings
4. **Full System Oversight**: Monitor all activities

## Technical Implementation

### Permission System
```javascript
// Role definitions
USER_ROLES = {
  TECHNICAL_MANAGER: 'technical_manager',
  SUPERVISOR: 'supervisor', 
  OPERATOR: 'operator',
  TECHNICIAN: 'technician'
}

// Permission checks
canAddMachine() // Technical Manager, Supervisor
canDeleteMachine() // Technical Manager, Supervisor  
canRecordDailyLog() // All except guests
canRecordMaintenance() // Technician only
canViewReports() // Technical Manager, Supervisor
```

### User Context
- Centralized permission management
- React Context for state management
- Persistent authentication
- Dynamic role-based rendering

### Security Features
- Role validation on component load
- Permission-based UI rendering
- Action-level permission checks
- Clear access denied messages

## Data Storage

### Daily Logs
- Stored in localStorage as 'dailyLogs'
- Includes equipment readings, operator info, timestamps
- Searchable and filterable by date/equipment

### User Sessions
- Stored in localStorage as 'currentUser'
- Includes role, name, email
- Auto-login on page refresh

### Equipment Data
- Static JSON data (machines.json, serviceHistory.json)
- Dynamic equipment management for authorized users
- Parameter definitions and validation rules

## Development

### Running the Application
```bash
npm run dev
# Application runs on http://localhost:5173/
```

### Key Components
- `UserContext.jsx`: Role-based permission system
- `Login.jsx`: Authentication with role selection
- `DailyLogs.jsx`: Daily logging interface
- `ServiceRecording.jsx`: Maintenance recording (Technician only)
- `EquipmentManagementUI.jsx`: Machine management (Manager/Supervisor only)
- `Navbar.jsx`: Role-based navigation

### Adding New Roles
1. Add role to `USER_ROLES` in `UserContext.jsx`
2. Define permissions in `ROLE_PERMISSIONS`
3. Update navigation items in `Navbar.jsx`
4. Add role-specific components as needed

---

**Note**: This system provides a comprehensive role-based approach to equipment management, ensuring that users only access features appropriate to their responsibilities while maintaining data integrity and operational security.