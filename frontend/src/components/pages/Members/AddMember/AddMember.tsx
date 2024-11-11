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
import { zodResolver } from "@hookform/resolvers/zod";
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

export function AddMember() {
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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  const members = [
    { id: 1, firstName: "Jean", lastName: "Dupont" },
    { id: 2, firstName: "Marie", lastName: "Durand" },
    { id: 3, firstName: "Pierre", lastName: "Martin" },
  ];

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
        <Button type="submit">Soumettre</Button>
      </form>
    </Form>
  );
}
