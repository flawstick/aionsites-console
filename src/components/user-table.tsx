import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  ListFilterIcon,
  FileIcon,
  CirclePlusIcon,
  MoveHorizontalIcon,
} from "@/components/icons";
import { useUserStore } from "@/lib/store/useUserStore";
import useAuth from "@/lib/hooks/useAuth";
import { useCompanyStore } from "@/lib/store/useCompanyStore";
import { CreateUser } from "@/components/create-user";
import { EditUser } from "@/components/edit-user";

export function UserTable() {
  const { session } = useAuth();
  const { users, fetchUsers, removeUser } = useUserStore();
  const { selectedCompany } = useCompanyStore();
  const [showCreateUserDialog, setShowCreateUserDialog] = useState(false);
  const [showEditUserDialog, setShowEditUserDialog] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  useEffect(() => {
    if (session && selectedCompany)
      fetchUsers(selectedCompany.tenantId as string);
  }, [session, selectedCompany, fetchUsers]);

  const handleDeleteUser = async (userId: string) => {
    removeUser(userId);
  };

  const handleEditUser = (userId: string) => {
    setEditingUserId(userId);
    setShowEditUserDialog(true);
  };

  const handleCloseEditUserDialog = () => {
    setEditingUserId(null);
    setShowEditUserDialog(false);
  };

  return (
    <>
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="archived" className="hidden sm:flex">
              Archived
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilterIcon className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuItem>Active</DropdownMenuItem>
                <DropdownMenuItem>Draft</DropdownMenuItem>
                <DropdownMenuItem>Archived</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <FileIcon className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button
              size="sm"
              className="h-8 gap-1"
              onClick={() => setShowCreateUserDialog(true)}
            >
              <CirclePlusIcon className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add User
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                Manage your users and view their information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Email
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Phone
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Joined
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell className="hidden sm:table-cell">
                        <img
                          alt="User image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={
                            user.profile?.profilePicture || "/placeholder.svg"
                          }
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{`${user.firstName} ${user.lastName}`}</TableCell>
                      <TableCell>
                        <Badge variant="outline">Active</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {user.username}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {user.profile?.bio || "N/A"}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(user.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoveHorizontalIcon className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => handleEditUser(user._id!)}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteUser(user._id!)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Dialog
        open={showCreateUserDialog}
        onOpenChange={setShowCreateUserDialog}
      >
        <CreateUser onClose={() => setShowCreateUserDialog(false)} />
      </Dialog>
      <Dialog open={showEditUserDialog}>
        <EditUser
          userId={editingUserId as string}
          onClose={handleCloseEditUserDialog}
        />
      </Dialog>
    </>
  );
}
