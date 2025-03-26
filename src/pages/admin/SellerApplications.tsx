import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import ClientLayout from "@/components/ClientLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { sellerApplications } from "@/lib/data";

export default function SellerApplications() {
  const { user } = useAuth();
  const [applications, setApplications] = useState(sellerApplications);

  const handleApprove = (applicationId: string) => {
    setApplications(applications.map(app => 
      app.id === applicationId 
        ? { ...app, status: 'approved' }
        : app
    ));
    toast.success("Application approved successfully");
  };

  const handleReject = (applicationId: string) => {
    setApplications(applications.map(app => 
      app.id === applicationId 
        ? { ...app, status: 'rejected' }
        : app
    ));
    toast.error("Application rejected");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <ClientLayout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Seller Applications</h1>
          <p className="text-muted-foreground mt-1">
            Review and manage seller applications
          </p>
        </div>

        <div className="grid gap-6">
          {applications.map((application) => (
            <Card key={application.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={application.avatarUrl}
                      alt={application.name}
                      className="h-12 w-12 rounded-full"
                    />
                    <div>
                      <CardTitle>{application.name}</CardTitle>
                      <CardDescription>{application.email}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(application.status)}>
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium">Business Name</p>
                    <p className="text-sm text-muted-foreground">{application.businessName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{application.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Business Address</p>
                    <p className="text-sm text-muted-foreground">{application.businessAddress}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Tax ID</p>
                    <p className="text-sm text-muted-foreground">{application.taxId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Submitted</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(application.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
              {application.status === 'pending' && (
                <div className="px-6 py-4 border-t">
                  <div className="flex justify-end space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => handleReject(application.id)}
                    >
                      Reject
                    </Button>
                    <Button
                      onClick={() => handleApprove(application.id)}
                    >
                      Approve
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </ClientLayout>
  );
}