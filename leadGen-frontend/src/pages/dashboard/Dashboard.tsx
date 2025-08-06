import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/auth/LogoutButton";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Dashboard() {
  const { user } = useAuth();
  type DataItem = {
    id: number;
    name: string;
    industry: string;
    location: string;
    phone: string;
  };
  const [data, setData] = useState<DataItem[]>([]);
  const [formData, setFormData] = useState({
    industry: "",
    location: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //const accessToken = localStorage.getItem("access_token"); // Assuming you stored the token after login

    try {
      const response = await axios.post(
        "http://localhost:8000/query/search/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const parsedData = JSON.parse(response.data);

      setData(parsedData);
      console.log(parsedData);
    } catch (error) {
      console.error("", error);
    } finally {
    }
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <div className="mb-4 flex flex-row gap-[80%]">
        <p>
          Welcome, {user?.first_name} {user?.last_name}
        </p>
        <LogoutButton variant="ghost" />
      </div>

      <hr></hr>

      <form onSubmit={handleSubmit}>
        <div>
          <div className="mt-4 flex flex-row gap-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
              <Input
                onChange={(e) =>
                  setFormData({ ...formData, industry: e.target.value })
                }
                type="industry"
                placeholder='Business type e.g., "Restaurant"'
                className="pl-10"
              />
            </div>

            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
              <Input
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                type="location"
                placeholder="Enter a town/city or postcode..."
                className="pl-10"
              />
            </div>

            <Button style={{ cursor: "pointer" }}>Search</Button>
          </div>
        </div>
      </form>
      <form>
        <Select>
          <SelectTrigger id="framework">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="next">Next.js</SelectItem>
            <SelectItem value="sveltekit">SvelteKit</SelectItem>
            <SelectItem value="astro">Astro</SelectItem>
            <SelectItem value="nuxt">Nuxt.js</SelectItem>
          </SelectContent>
        </Select>
      </form>
      <br></br>
      <hr></hr>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Phone</TableHead>

            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.industry}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.phone}</TableCell>

                <Badge style={{ marginTop: "6px", backgroundColor: "green" }}>
                  New
                </Badge>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>No data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

export default Dashboard;
