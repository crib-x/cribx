"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Mail, Linkedin, Plus } from "lucide-react";
import Image from "next/image";
import { TeamMember } from "@/lib/types/team";
import AddTeamMemberDialog from "./add-team-member-dialogue";
import DashboardHeader from "../dashboard-header";
import { useState } from "react";

interface TeamTableProps {
  teamMembers: TeamMember[];
}

export default function TeamTable({ teamMembers }: TeamTableProps) {
  const [showAddMember, setShowAddMember] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const editUser = (member: TeamMember) => {
    setSelectedMember(member)
    setShowAddMember(true)
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <DashboardHeader
          title="Team Management"
          description="Manage your team members and their roles"
        />
        <Button onClick={() => setShowAddMember(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Team Member</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{member.name}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {member.email}
                    </div>
                    <div className="flex items-center text-sm">
                      <Linkedin className="h-4 w-4 mr-2 text-gray-400" />
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Profile
                      </a>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      member.status === "Active" ? "default" : "secondary"
                    }
                  >
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button onClick={()=> editUser(member)} variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <AddTeamMemberDialog
          member={selectedMember}
          open={showAddMember}
          onOpenChange={setShowAddMember}
        />
      </div>
    </>
  );
}
