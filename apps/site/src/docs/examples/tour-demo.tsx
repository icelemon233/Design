import { Button, Space, Tour } from '@cinna-design/react';
import { useRef, useState } from 'react';
export default function TargetTourDemo() {
  const recipe = useRef<HTMLButtonElement>(null),
    save = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false),
    [current, setCurrent] = useState(0);
  return (
    <>
      <Space wrap>
        <Button
          onClick={() => {
            setCurrent(0);
            setOpen(true);
          }}
        >
          Start guide
        </Button>
        <Button ref={recipe} variant="cream">
          Choose recipe
        </Button>
        <Button ref={save} variant="cream">
          Save changes
        </Button>
      </Space>
      <Tour
        open={open}
        current={current}
        onChange={setCurrent}
        onClose={() => setOpen(false)}
        steps={[
          {
            title: 'Choose a recipe',
            description: 'Start with a recipe from your collection.',
            target: () => recipe.current,
          },
          {
            title: 'Save your changes',
            description: 'Keep the latest version of your recipe.',
            target: () => save.current,
          },
        ]}
      />
    </>
  );
}
