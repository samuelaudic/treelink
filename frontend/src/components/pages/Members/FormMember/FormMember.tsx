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
import { useToast } from "@/hooks/use-toast";
import { Member } from "@/interfaces/Member";
import { getMembers, saveMember, updateMember } from "@/services/MemberService";
import { zodResolver } from "@hookform/resolvers/zod";
import { on } from "events";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
  deathDate: z.string().optional(),
  father: z.string().optional(),
  mother: z.string().optional(),
  spouse: z.string().optional(),
});

export function FormMember({
  refreshMembers,
  memberToEdit,
  onEditComplete,
}: {
  refreshMembers: () => void;
  memberToEdit?: Member | null;
  onEditComplete?: () => void;
}) {
  const { toast } = useToast();
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
      firstName: memberToEdit?.firstName || "",
      lastName: memberToEdit?.lastName || "",
      gender: memberToEdit?.gender || "M",
      birthDate: memberToEdit?.birthDate?.toISOString().split("T")[0] || "",
      deathDate: memberToEdit?.deathDate?.toISOString().split("T")[0] || "",
      father: memberToEdit?.fatherId?.toString() || "",
      mother: memberToEdit?.motherId?.toString() || "",
      spouse: memberToEdit?.spouseId?.toString() || "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (memberToEdit) {
      reset({
        firstName: memberToEdit.firstName || "",
        lastName: memberToEdit.lastName || "",
        gender: memberToEdit.gender || "M",
        birthDate: memberToEdit.birthDate
          ? memberToEdit.birthDate.toISOString().split("T")[0]
          : "",
        deathDate: memberToEdit.deathDate
          ? memberToEdit.deathDate.toISOString().split("T")[0]
          : "",
        father: memberToEdit.fatherId?.toString() || "",
        mother: memberToEdit.motherId?.toString() || "",
        spouse: memberToEdit.spouseId?.toString() || "",
      });
    } else {
      reset({
        firstName: "",
        lastName: "",
        gender: "M",
        birthDate: "",
        deathDate: "",
        father: "",
        mother: "",
        spouse: "",
      });
    }
  }, [memberToEdit, reset]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const transformedData: Member = {
        id: memberToEdit?.id || 0,
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
        children: memberToEdit?.children || [],
        createdAt: memberToEdit?.createdAt || new Date(),
      };

      if (memberToEdit) {
        // Update member
        await updateMember(transformedData);
        toast({
          title: "Membre mis à jour avec succès !",
          type: "foreground",
        });
        onEditComplete && onEditComplete(); // Callback if provided
      } else {
        // Create member
        await saveMember(transformedData);
        toast({
          title: "Membre créé avec succès !",
          type: "foreground",
        });
      }

      refreshMembers();
      form.reset();
    } catch (error) {
      toast({
        title: "Erreur lors de l'enregistrement du membre.",
        type: "foreground",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    onEditComplete && onEditComplete();
    form.reset();
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
                      {members.map((member) => (
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
        <div className="flex gap-4">
          <Button type="submit">
            {memberToEdit ? "Mettre à jour" : "Créer"}
          </Button>
          {memberToEdit && (
            <Button type="button" variant="secondary" onClick={handleCancel}>
              Annuler
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
