import { Routes, Route } from "react-router-dom";
import { AppHeaderSection } from "./sections/AppHeaderSection";
import { LandlordDashboardOverviewSection } from "./sections/LandlordDashboardOverviewSection";
import { LoginFormSection } from "./sections/LoginFormSection";
import { PropertyDetailSection } from "./sections/PropertyDetailSection";
import { PropertyMapViewSection } from "./sections/PropertyMapViewSection";
import { PropertySearchSection } from "./sections/PropertySearchSection";
import { RentTrackingDashboardSection } from "./sections/RentTrackingDashboardSection";
import { RoleSelectionSection } from "./sections/RoleSelectionSection/RoleSelectionSection";
import { StudentDashboardOverviewSection } from "./sections/StudentDashboardOverviewSection";
import { AdminPanelSection } from "./sections/AdminPanelSection";
import { ProtectedRoute } from "../../components/ProtectedRoute/ProtectedRoute";

export const Frame = (): JSX.Element => {
  return (
    <main className="w-full bg-white">
      <section className="w-full">
        <AppHeaderSection />
      </section>

      <section className="w-full">
        <Routes>
          <Route path="/" element={<RoleSelectionSection />} />
          <Route path="/login" element={<LoginFormSection />} />

          <Route
            path="/student"
            element={
              <ProtectedRoute role="student">
                <StudentDashboardOverviewSection />
              </ProtectedRoute>
            }
          />
          <Route path="/search" element={<PropertySearchSection />} />
          <Route path="/map" element={<PropertyMapViewSection />} />
          <Route path="/property/:id" element={<PropertyDetailSection />} />

          <Route
            path="/landlord"
            element={
              <ProtectedRoute role="landlord">
                <LandlordDashboardOverviewSection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rent-tracking"
            element={
              <ProtectedRoute role="landlord">
                <RentTrackingDashboardSection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminPanelSection />
              </ProtectedRoute>
            }
          />
        </Routes>
      </section>
    </main>
  );
};
