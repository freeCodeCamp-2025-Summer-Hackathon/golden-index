# VolunteerMatch — Core User Flow & Project Structure

---

## 👥 User Roles & Registration Flow

### User Types
- **Volunteer**  
  - Can register, log in, browse events, sign up for roles, check in/out, and track hours.

- **Organisation Admin**  
  - Can register and create an organisation profile.
  - Manage organisation’s events and volunteer signups.
  - Approve or reject volunteer participation if limits apply.

### Registration Flow
- Users choose if they are:
  - **Volunteer** → Registers with basic info, role assigned as "volunteer".
  - **Organisation Admin** → Registers with info + organisation details (name, description).
    - Organisation created and linked to the user.

### Login & Security
- JWT-based authentication for stateless API security.
- Role-based access control:
  - Volunteers have access to volunteer-specific features.
  - Org admins have access to organisation management features.

---

## 🏗️ Project Structure Overview

### Main Entities
- **Users**
  - Have roles: "volunteer" or "org_admin".
  - Org admins are linked to an organisation.
- **Organisations**
  - Represent groups hosting events.
  - Managed by one or more org admins.
- **Events**
  - Created by organisations.
  - Have categories (e.g., Environment, Education).
  - Have roles that volunteers can sign up for.
  - Each role may have a volunteer limit.
- **Categories**
  - Used to classify events for easier searching/filtering.

---

## 🔍 Core Features

### Event Discovery
- Volunteers can search for events based on:
  - **Location** (e.g., city, radius)
  - **Category** (e.g., Environment, Education, Animal Welfare)
- Event listings show key info and available roles.

### Volunteer Sign-up & Participation
- Volunteers sign up for specific roles in events.
- If roles have limits, signups can be pending approval by org admins.
- Volunteers can check in/out and log hours served.

### Organisation Management
- Org admins can:
  - Create and manage events and their roles.
  - Approve or reject volunteer signups.
  - View volunteer participation stats.

---

## 🔐 Security Summary

- **Registration & Login:** Secure JWT authentication.
- **Role-Based Access:** Middleware to restrict endpoints/features by role.
- **Data Privacy:** Volunteers see their own logs and signups; org admins see data for their organisation only.

---

## 🗺️ Bonus Considerations (Future)

- Enhanced location search with maps.
- Event reminders/notifications.
- Multi-admin support per organisation.
- Volunteer impact dashboards with stats and badges.

---

## Futrue features
Status on users
Roles on users
Notifications
Waiting list
Gamification for Gaining badges
dashboard
create a resume for volunteering success
events calander
categories 
adding pings of the evnts to the world.


problem

people want to volunteer
organisations have events for voluntering
organisations need volunteers and needs a platform where volunteers can sign up for it and then attend the events stipulated.



