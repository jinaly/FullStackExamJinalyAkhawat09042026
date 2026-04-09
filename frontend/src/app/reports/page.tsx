'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { showToast } from '@/utils/toast';
import { MESSAGES } from '@/constants/messages';
import { ReportsData, DailyRevenue, TopSpender, CategorySummary } from '@/types';
import { rest } from '@/api/rest';

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportsData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await rest.get<ReportsData>('/reports');
        setReports(res.data);
      } catch (err: any) {
        if (err.response?.status === 401) {
          showToast({ title: MESSAGES.LOGIN_REQUIRED, type: 'error' });
          router.push('/login');
        } else {
          showToast({ title: MESSAGES.REPORT_FETCH_ERROR, type: 'error' });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [router]);

  if (loading) return <div className="text-center mt-12">Loading reports...</div>;
  if (!reports) return <div className="text-center mt-12">Failed to load reports</div>;

  return (
    <div className="max-w-[1000px] mx-auto">
      <h1>Advanced Reporting</h1>
      
      <div className="glass-panel report-section">
        <h2>PostgreSQL: Daily Revenue (Last 7 Days)</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-[#f7f7f7] p-3 text-left text-xs text-[#555] border-b border-[#eee]">Date</th>
              <th className="bg-[#f7f7f7] p-3 text-left text-xs text-[#555] border-b border-[#eee]">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {reports.dailyRevenue?.map((row: DailyRevenue, i: number) => (
              <tr key={i}>
                <td className="p-3 border-b border-[#eee]">{new Date(row.date).toLocaleDateString()}</td>
                <td className="p-3 border-b border-[#eee] price">{Number(row.revenue).toFixed(2)}</td>
              </tr>
            ))}
            {reports.dailyRevenue && reports.dailyRevenue.length > 0 && (
              <tr className="font-bold border-t-2 border-[#ddd]">
                 <td className="p-3">Grand Total</td>
                 <td className="p-3 price">{reports.dailyRevenue.reduce((acc, curr) => acc + Number(curr.revenue), 0).toFixed(2)}</td>
              </tr>
            )}
            {(!reports.dailyRevenue || reports.dailyRevenue.length === 0) && (
               <tr><td colSpan={2} className="p-3 text-center">No data available</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="glass-panel report-section">
        <h2>PostgreSQL: Top 3 Spenders</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-[#f7f7f7] p-3 text-left text-xs text-[#555] border-b border-[#eee]">User ID</th>
              <th className="bg-[#f7f7f7] p-3 text-left text-xs text-[#555] border-b border-[#eee]">Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {reports.topSpenders?.map((row: TopSpender, i: number) => (
              <tr key={i}>
                <td className="p-3 border-b border-[#eee]">{row.user_id}</td>
                <td className="p-3 border-b border-[#eee] price">{Number(row.total_spent).toFixed(2)}</td>
              </tr>
            ))}
            {(!reports.topSpenders || reports.topSpenders.length === 0) && (
               <tr><td colSpan={2} className="p-3 text-center">No data available</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="glass-panel report-section">
        <h2>MongoDB: Sales Summary by Category</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-[#f7f7f7] p-3 text-left text-xs text-[#555] border-b border-[#eee]">Category</th>
              <th className="bg-[#f7f7f7] p-3 text-left text-xs text-[#555] border-b border-[#eee]">Units Sold</th>
              <th className="bg-[#f7f7f7] p-3 text-left text-xs text-[#555] border-b border-[#eee]">Avg. Sale Price</th>
            </tr>
          </thead>
          <tbody>
            {reports.productsByCategory?.map((row: CategorySummary, i: number) => (
              <tr key={i}>
                <td className="p-3 border-b border-[#eee]">{row._id}</td>
                <td className="p-3 border-b border-[#eee]">{row.count}</td>
                <td className="p-3 border-b border-[#eee] price">{Number(row.avgPrice).toFixed(2)}</td>
              </tr>
            ))}
            {(!reports.productsByCategory || reports.productsByCategory.length === 0) && (
               <tr><td colSpan={3} className="p-3 text-center">No data available</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
