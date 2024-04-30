import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
type AddPostCard = {
  title: string;
  content: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
};
export function AddPostCard({title, content, setTitle, setContent, onClick}: AddPostCard) {
  return (
    <Card className="flex flex-col p-4 gap-2">
      <CardTitle>Add a Post</CardTitle>
      <Label htmlFor="title" className="text-green-700 text-lg font-bold">
        Title
      </Label>
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></Input>
      <Label htmlFor="content" className="text-green-700 text-lg font-bold">
        Content
      </Label>
      <Textarea
        placeholder="Content"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></Textarea>

      <Button className="bg-green-600 w-[100px]" onClick={onClick}>
        Add
      </Button>
    </Card>
  );
}
