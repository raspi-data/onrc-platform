"use client";

import { useState, useEffect, useCallback } from "react";

type Order = {
  id: string;
  cui: string;
  companyName: string | null;
  email: string;
  documentType: string;
  status: string;
  amountPaid: number | null;
  pdfPath: string | null;
  errorMessage: string | null;
  createdAt: string;
};

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: "În așteptare", color: "bg-yellow-100 text-yellow-700" },
  paid: { label: "Plătit", color: "bg-blue-100 text-blue-700" },
  processing: { label: "Procesare", color: "bg-purple-100 text-purple-700" },
  completed: { label: "Finalizat", color: "bg-green-100 text-green-700" },
  failed: { label: "Eșuat", color: "bg-red-100 text-red-700" },
};

export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = filterStatus ? `?status=${filterStatus}` : "";
      const res = await fetch(`/api/admin/orders${params}`, {
        headers: { "x-admin-secret": secret },
      });
      if (!res.ok) {
        if (res.status === 401) {
          setAuthenticated(false);
          setError("Secret incorect");
        }
        return;
      }
      const data = await res.json();
      setOrders(data.orders);
      setTotal(data.total);
    } catch {
      setError("Eroare la încărcarea comenzilor");
    } finally {
      setLoading(false);
    }
  }, [secret, filterStatus]);

  useEffect(() => {
    if (authenticated) fetchOrders();
  }, [authenticated, fetchOrders]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setAuthenticated(true);
  }

  const stats = {
    total,
    completed: orders.filter((o) => o.status === "completed").length,
    processing: orders.filter((o) => o.status === "processing" || o.status === "paid").length,
    failed: orders.filter((o) => o.status === "failed").length,
    revenue: orders
      .filter((o) => o.amountPaid)
      .reduce((sum, o) => sum + (o.amountPaid || 0), 0) / 100,
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="max-w-sm w-full bg-white rounded-2xl border border-gray-200 p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="font-semibold text-gray-900">Admin Dashboard</span>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Secret Admin
              </label>
              <input
                type="password"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Introdu secretul admin"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Intră în dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">O</span>
            </div>
            <span className="font-semibold text-gray-900">Admin Dashboard</span>
          </div>
          <button
            onClick={fetchOrders}
            disabled={loading}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
          >
            {loading ? "Se încarcă..." : "Reîncarcă"}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Total comenzi</p>
            <p className="text-2xl font-bold text-gray-900">{total}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Finalizate</p>
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">În procesare</p>
            <p className="text-2xl font-bold text-blue-600">{stats.processing}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Venituri (RON)</p>
            <p className="text-2xl font-bold text-gray-900">{stats.revenue.toFixed(0)}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {["", "pending", "paid", "processing", "completed", "failed"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === s
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {s === "" ? "Toate" : STATUS_LABELS[s]?.label || s}
            </button>
          ))}
        </div>

        {/* Orders table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {orders.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              {loading ? "Se încarcă..." : "Nicio comandă găsită"}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">ID</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">CUI</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Document</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Sumă</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => {
                    const statusInfo = STATUS_LABELS[order.status] || { label: order.status, color: "bg-gray-100 text-gray-700" };
                    return (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-gray-500">
                          {order.id.slice(0, 8)}…
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {order.cui}
                          {order.companyName && (
                            <div className="text-xs text-gray-400 truncate max-w-[120px]">
                              {order.companyName}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-600 max-w-[160px] truncate">
                          {order.email}
                        </td>
                        <td className="px-4 py-3 text-gray-600 text-xs">
                          {order.documentType.replace(/_/g, " ")}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                          {order.errorMessage && (
                            <div className="text-xs text-red-400 mt-1 max-w-[150px] truncate" title={order.errorMessage}>
                              {order.errorMessage}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {order.amountPaid ? `${(order.amountPaid / 100).toFixed(0)} RON` : "—"}
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                          {new Date(order.createdAt).toLocaleString("ro-RO", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
