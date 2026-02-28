import { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Calendar, TrendingDown, TrendingUp, Leaf, Zap, BarChart3, Activity } from 'lucide-react';
import * as api from '../api';

export default function Reports() {
    const [runs, setRuns] = useState([]);
    const [period, setPeriod] = useState('week');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const runsData = await api.getRuns({ limit: 500 });
                setRuns(runsData);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    // Filter runs by period
    const now = new Date();
    const periodDays = period === 'week' ? 7 : period === 'month' ? 30 : 365;
    const cutoffDate = new Date(now.getTime() - periodDays * 24 * 60 * 60 * 1000);
    const filteredRuns = runs.filter(r => new Date(r.timestamp) >= cutoffDate);

    // Calculate summary stats
    const totalCarbon = filteredRuns.reduce((sum, r) => sum + (r.carbon?.total_grams || 0), 0);
    const totalEnergy = filteredRuns.reduce((sum, r) => sum + (r.energy?.total_kwh || 0), 0);
    const avgCarbon = filteredRuns.length > 0 ? totalCarbon / filteredRuns.length : 0;

    // Compare with previous period
    const prevCutoff = new Date(cutoffDate.getTime() - periodDays * 24 * 60 * 60 * 1000);
    const prevRuns = runs.filter(r => {
        const d = new Date(r.timestamp);
        return d >= prevCutoff && d < cutoffDate;
    });
    const prevTotal = prevRuns.reduce((sum, r) => sum + (r.carbon?.total_grams || 0), 0);
    const trendPercent = prevTotal > 0 ? ((totalCarbon - prevTotal) / prevTotal * 100).toFixed(1) : 0;

    // Group by day for chart
    const groupByDay = (runs) => {
        const groups = {};
        runs.forEach(r => {
            const date = new Date(r.timestamp).toLocaleDateString();
            if (!groups[date]) groups[date] = { carbon: 0, energy: 0, count: 0 };
            groups[date].carbon += r.carbon?.total_grams || 0;
            groups[date].energy += r.energy?.total_kwh || 0;
            groups[date].count++;
        });
        return groups;
    };

    const dailyData = groupByDay(filteredRuns);
    const labels = Object.keys(dailyData).slice(-14);

    const chartData = {
        labels,
        datasets: [{
            label: 'Carbon (gCO2)',
            data: labels.map(d => dailyData[d]?.carbon?.toFixed(4) || 0),
            backgroundColor: 'rgba(34, 197, 94, 0.6)',
            borderColor: '#22C55E',
            borderWidth: 2,
            borderRadius: 4,
        }],
    };

    const energyChartData = {
        labels,
        datasets: [{
            label: 'Energy (Wh)',
            data: labels.map(d => ((dailyData[d]?.energy || 0) * 1000).toFixed(4)),
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4,
        }],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { grid: { color: 'rgba(48, 54, 61, 0.3)' }, ticks: { color: '#8B949E' } },
            y: { grid: { color: 'rgba(48, 54, 61, 0.3)' }, ticks: { color: '#8B949E' } },
        },
    };

    if (loading) {
        return (
            <div className="animate-fade-in text-center" style={{ padding: '4rem' }}>
                <Calendar size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                <h2>Loading Reports...</h2>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div className="page-header flex justify-between items-start">
                <div>
                    <h1 className="flex items-center gap-sm"><Calendar size={28} /> Reports</h1>
                    <p>Weekly and monthly carbon usage reports</p>
                </div>
                <div className="flex gap-sm">
                    {['week', 'month', 'year'].map(p => (
                        <button key={p} className={`btn ${period === p ? 'btn-primary' : 'btn-outline'}`} onClick={() => setPeriod(p)}>
                            {p === 'week' ? 'This Week' : p === 'month' ? 'This Month' : 'This Year'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-4 mb-xl">
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(34, 197, 94, 0.15)' }}><Leaf size={24} /></div>
                    <div className="stat-value mt-md">{totalCarbon.toFixed(2)}g</div>
                    <div className="stat-label">Total Carbon</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6' }}><Zap size={24} /></div>
                    <div className="stat-value mt-md">{(totalEnergy * 1000).toFixed(2)}Wh</div>
                    <div className="stat-label">Total Energy</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#A855F7' }}><BarChart3 size={24} /></div>
                    <div className="stat-value mt-md">{filteredRuns.length}</div>
                    <div className="stat-label">Total Runs</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: parseFloat(trendPercent) <= 0 ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)' }}>
                        {parseFloat(trendPercent) <= 0 ? <TrendingDown size={24} /> : <TrendingUp size={24} style={{ color: '#EF4444' }} />}
                    </div>
                    <div className="stat-value mt-md flex items-center justify-center gap-xs" style={{ color: parseFloat(trendPercent) <= 0 ? '#22C55E' : '#EF4444' }}>
                        {parseFloat(trendPercent) <= 0 ? <TrendingDown size={20} /> : <TrendingUp size={20} />} {Math.abs(trendPercent)}%
                    </div>
                    <div className="stat-label">vs Previous {period}</div>
                </div>
            </div>

            <div className="grid grid-2 mb-xl">
                <div className="card">
                    <div className="card-header"><h3 className="card-title flex items-center gap-sm"><Leaf size={18} /> Daily Carbon Usage</h3></div>
                    <div style={{ height: '300px' }}>
                        {labels.length > 0 ? <Bar data={chartData} options={chartOptions} /> : (
                            <div className="text-center text-secondary" style={{ paddingTop: '100px' }}>
                                <p>No data for this period</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="card">
                    <div className="card-header"><h3 className="card-title flex items-center gap-sm"><Zap size={18} /> Energy Trend</h3></div>
                    <div style={{ height: '300px' }}>
                        {labels.length > 0 ? <Line data={energyChartData} options={chartOptions} /> : (
                            <div className="text-center text-secondary" style={{ paddingTop: '100px' }}>
                                <p>No data for this period</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-header"><h3 className="card-title flex items-center gap-sm"><Activity size={18} /> Insights</h3></div>
                <div className="grid grid-3">
                    <div className="text-center" style={{ padding: 'var(--space-lg)' }}>
                        <div style={{ fontSize: '2rem', fontWeight: '700', color: '#22C55E' }}>{avgCarbon.toFixed(4)}g</div>
                        <div className="text-secondary">Avg Carbon per Run</div>
                    </div>
                    <div className="text-center" style={{ padding: 'var(--space-lg)' }}>
                        <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3B82F6' }}>{(filteredRuns.length / periodDays).toFixed(1)}</div>
                        <div className="text-secondary">Runs per Day</div>
                    </div>
                    <div className="text-center" style={{ padding: 'var(--space-lg)' }}>
                        <div style={{ fontSize: '2rem', fontWeight: '700', color: '#A855F7' }}>{(totalCarbon / 8).toFixed(2)}</div>
                        <div className="text-secondary">Trees Saved (mins)</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
