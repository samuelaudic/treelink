import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Member } from "@/interfaces/Member";
import { getMembers, saveMember } from "@/services/MemberService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Le prénom doit contenir au moins 2 caractères." }),
  lastName: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  gender: z.string().optional(),
  birthDate: z.string().optional(),
  deathDate: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (value) {
          return new Date(value) > new Date();
        }
        return true;
      },
      {
        message:
          "La date de décès doit être postérieure à la date de naissance.",
      }
    ),
  father: z.string().optional(),
  mother: z.string().optional(),
  spouse: z.string().optional(),
});

export function AddMember({ refreshMembers }: { refreshMembers: () => void }) {
  const [members, setMembers] = useState<Member[]>([]);
  const loadMembers = async () => {
    try {
      const fetchedMembers = await getMembers();
      setMembers(fetchedMembers);
    } catch (error) {
      console.error("Erreur lors du chargement des membres:", error);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "M",
      birthDate: "",
      deathDate: "",
      father: "",
      mother: "",
      spouse: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const transformedData: Member = {
        id: 0,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender || "M",
        birthDate: data.birthDate ? new Date(data.birthDate) : null,
        deathDate: data.deathDate ? new Date(data.deathDate) : null,
        father: data.father
          ? members.find((member) => member.id === parseInt(data.father!)) ||
            null
          : null,
        fatherId: data.father ? parseInt(data.father) : null,
        mother: data.mother
          ? members.find((member) => member.id === parseInt(data.mother!)) ||
            null
          : null,
        motherId: data.mother ? parseInt(data.mother) : null,
        spouse: data.spouse
          ? members.find((member) => member.id === parseInt(data.spouse!)) ||
            null
          : null,
        spouseId: data.spouse ? parseInt(data.spouse) : null,
        createdAt: new Date(),
      };

      console.log("Submitting:", transformedData);

      const savedMember = await saveMember(transformedData);

      refreshMembers();

      form.reset();

      toast.success("Membre enregistré avec succès.");

      console.log("Saved member:", savedMember);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du membre:", error);
      toast.error("Erreur lors de l'enregistrement du membre.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Samuel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Audic" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="F">F</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Birth Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deathDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Death Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {["father", "mother", "spouse"].map((relation) => (
            <FormField
              key={relation}
              control={form.control}
              name={relation as "father" | "mother" | "spouse"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {relation === "father"
                      ? "Père"
                      : relation === "mother"
                      ? "Mère"
                      : "Conjoint"}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={`Sélectionner un ${relation}`}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {members
                        .filter((member) => {
                          const currentBirthDate = new Date(
                            form.getValues("birthDate") || "1970-01-01"
                          );
                          const memberBirthDate = new Date(
                            member.birthDate?.toDateString() || "1970-01-01"
                          );
                          return memberBirthDate < currentBirthDate; // Plus âgé
                        })
                        .map((member) => (
                          <SelectItem
                            key={member.id}
                            value={member.id.toString()}
                          >
                            {member.firstName} {member.lastName.toUpperCase()}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button type="submit">Soumettre</Button>
      </form>
    </Form>
  );
}
