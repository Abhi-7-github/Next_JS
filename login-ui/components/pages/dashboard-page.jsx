"use client";
import React from 'react';
import MainLayout from '../layout/main-layout';
import Sidebar from '../layout/sidebar';
import Navbar from '../layout/navbar';
import Footer from '../layout/footer';
import Card from '../global/card';

const DashboardPage = () => (
  <MainLayout
    navbar={<Navbar />}
    sidebar={<Sidebar role="admin" />}
    footer={<Footer />}
  >
    <h1 className="text-3xl font-bold mb-6 text-black">Admin Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <h2 className="text-xl text-black font-semibold mb-2">Welcome!</h2>
        <p className="text-black">This is your admin dashboard. Here you can find your courses, progress, and more.</p>
      </Card>
      <Card>
        <h2 className="text-xl text-black font-semibold mb-2">Quick Actions</h2>
        <ul className="list-disc pl-5 text-black space-y-1 text-sm">
          <li>View course list</li>
          <li>Manage users</li>
          <li>Check recent activity</li>
        </ul>
      </Card>
    </div>
  </MainLayout>
);

export default DashboardPage;
