#include <stdio.h>
#include <string.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>
#include <ctype.h>

typedef struct s_stack
{
	char			content;
	int				stack_index;
	struct s_stack	*next;
}				t_stack;

typedef struct s_commands
{
	int	moves;
	int	pointA;
	int	pointB;
	struct s_commands	*next;
}				t_commands;

t_stack *newNode(char c, int index);


void	ft_free(t_stack **stack)
{
	int	i;

	i = 0;
	while (stack[i] != NULL)
	{
		free(stack[i]);
		i++;
	}
	free(stack);
}

void	addFront(t_stack **dst, t_stack *new)
{
	if (*dst == NULL)
	{
		*dst = new;
		return ;
	}
	new->next = *dst;
	*dst = new;
}

void	delFrontCrate(t_stack **stack, t_stack **dst)
{
	t_stack *head = *stack;
	t_stack *new;

	if (!head)
		return ;
	new = newNode(head->content, head->stack_index);
	if (!new)
		return ;
	addFront(dst, new);
	*stack = head->next;
	free(head);
}

void	moveCrate(t_stack **src, t_stack **dst)
{
	if (!*src)
		return ;
	delFrontCrate(src, dst);
}

void	delCrate(t_stack **src, t_stack **dst, int index)
{
	t_stack *head = *src;
	t_stack *new;
	t_stack *prev;
	int i = 1;

	if (!head)
		return ;
	if (index == i)
	{
		new = newNode(head->content, head->stack_index);
		if (!new)
			return ;
		addFront(dst, new);
		*src = head->next;
		free(head);
		return ;
	}
	while (head)
	{
		if (index == i)
		{
			prev->next = head->next;
			new = newNode(head->content, head->stack_index);
			addFront(dst, new);
			free(head);
			head = prev->next;
		}
		else
		{
			prev = head;
			head = head->next;
		}
		i++;
	}

}

void	moveCrate2(t_stack **src, t_stack **dst, int cratePosition)
{
	if (!src)
		return ;
	delCrate(src, dst, cratePosition);
}

t_stack *newNode(char c, int index)
{
	t_stack *new;

	new = (t_stack*) malloc(sizeof(t_stack));
	if (!new)
		return (NULL);
	new->content = c;
	new->stack_index = index;
	new->next = NULL;
	return (new);
}

t_commands *newCommand(int move, int pA, int pB)
{
	t_commands *new;

	new = (t_commands *) malloc(sizeof(t_commands));
	if (!new)
		return (NULL);
	new->moves = move;
	new->pointA = pA;
	new->pointB = pB;
	new->next = NULL;
	return (new);
}

void	addBack(t_stack **stack, t_stack *new)
{
	t_stack	*curr;

	if (*stack == NULL)
	{
		*stack = new;
		return ;
	}
	curr = *stack;
	while (curr->next != NULL)
		curr = curr->next;
	curr->next = new;
}

void	addCommands(t_commands **commands, t_commands *new)
{
	t_commands *curr;

	if (*commands == NULL)
	{
		*commands = new;
		return ;
	}
	curr = *commands;
	while (curr->next != NULL)
		curr = curr->next;
	curr->next = new;
}

int	getFileContentLen(char *str)
{
	FILE	*file;
	char	c;
	int	i = 0;

	file = fopen(str, "r");
	do
	{
		c = fgetc(file);
		i++;
	}
	while (c != EOF);
	fclose(file);
	return (i);
}

char	*getFileContent(int fd, char *file)
{
	int		bytes = 1;
	char	*line;

	while (bytes != 0)
	{
		line = (char *)malloc(2);
		bytes = read(fd, line, 1);
		if (bytes == 0)
		{
			free(line);
			line = NULL;
			break ;
		}
		strcat(file, line);
		free(line);
	}
	return (file);
}

int	getTotalStacks(char *file)
{
	int i;

	i = 0;
	while (file[i] != '\0')
	{
		if (file[i] == '\n')
			break;
		i++;
	}
	return (i);
}

t_stack **createStacks(char *file, int totalStacks)
{
	t_stack	**stacks;
	t_stack *new;

	stacks = (t_stack **) malloc(sizeof(t_stack) * (totalStacks + 1));
	if (!stacks)
		return (NULL);
	int i = 0;
	int j = 0;
	while (*file != '\0')
	{
		if (isalpha(*file))
		{
			if (!stacks[j])
			{
				new = newNode(*file, j);
				if (!new)
				{
					ft_free(stacks);
					return (NULL);
				}
				stacks[j] = new;
			}
			else
			{
				new = newNode(*file, j);
				if (!new)
				{
					ft_free(stacks);
					return (NULL);
				}
				addBack(&stacks[j], new);
			}
		}
		if (*file == '\n')
			j = 0;
		if ((i + 1) % 4 == 0 && *file != '\n')
			j += 1;
		if (isdigit(*file))
			break ;
		file++;
		i++;
	}
	return stacks;
}

void	createStruct(char *file)
{
	int			i;
	int			totalStacks;
	t_stack		**stacks;
	t_stack		**stacks2;
	t_commands	*commands;


	// gets total lines for input data
	totalStacks = getTotalStacks(file) / 4;

	// creating each stack
	stacks = createStacks(file, totalStacks);
	if (!stacks)
		return ;
	stacks2 = createStacks(file, totalStacks);
	if (!stacks2)
		return ;

	// move to the line of instructions
	while (*file)
	{
		if (*file == 'm')
			break ;
		file++;
	}

	// get total number of commands
	i = 0;
	int totalCommands = 0;
	while (file[i] != '\0')
	{
		if (file[i] == '\n')
			totalCommands++;
		i++;
	}

	// get commands
	commands = (t_commands *)malloc(sizeof(t_commands) * (totalCommands + 1));
	if (!commands)
		return ;
	int reset_value = 0;
	int c1, c2, c3, nmb;
	int intialized_head = 0;
	char *part1 = file;
	while (*file)
	{
		if (isdigit(*file))
		{
			nmb = atoi(&(*file));
			if (nmb >= 10)
				file++;
			if (reset_value == 0)
				c1 = nmb;
			else if (reset_value == 1)
				c2 = nmb;
			else if (reset_value == 2)
				c3 = nmb;
			reset_value++;
			if (reset_value == 3)
			{
				if (!intialized_head)
				{
					commands->moves = c1;
					commands->pointA = c2;
					commands->pointB = c3;
					intialized_head = 1;
				}
				else
				{
					t_commands *new = newCommand(c1, c2, c3);
					if (!new)
						return ;
					addCommands(&commands, new);
				}
				reset_value = 0;
			}
		}
		file++;
	}

	//Part 1
	while (commands)
	{
		while (commands->moves > 0)
		{
			if (stacks[commands->pointA - 1] != NULL)
			{
				if (commands->pointB - 1 > totalStacks)
				{
					printf("\n**No such stack exists**\n");
					break ;
				}
				moveCrate(&stacks[commands->pointA - 1], &stacks[commands->pointB - 1]);
			}
			commands->moves--;
		}
		commands = commands->next;
	}
	i = 0;
	while (i <= totalStacks)
	{
		if (stacks[i])
			printf("%c", stacks[i]->content);
		i++;
	}
	printf("\n");

	//Part 2
	file = part1;
	while (*file)
	{
		if (isdigit(*file))
		{
			nmb = atoi(&(*file));
			if (nmb >= 10)
				file++;
			if (reset_value == 0)
				c1 = nmb;
			else if (reset_value == 1)
				c2 = nmb;
			else if (reset_value == 2)
				c3 = nmb;
			reset_value++;
			if (reset_value == 3)
			{
				if (!intialized_head)
				{
					commands->moves = c1;
					commands->pointA = c2;
					commands->pointB = c3;
					intialized_head = 1;
				}
				else
				{
					t_commands *new = newCommand(c1, c2, c3);
					addCommands(&commands, new);
				}
				reset_value = 0;
			}
		}
		file++;
	}
	while (commands)
	{
		if (stacks2[commands->pointA - 1] != NULL)
		{
			if (commands->moves == 1)
				moveCrate(&stacks2[commands->pointA - 1], &stacks2[commands->pointB - 1]);
			else
				while (commands->moves > 0)
				{
					moveCrate2(&stacks2[commands->pointA - 1], &stacks2[commands->pointB - 1], commands->moves);
					commands->moves--;
				}
		}
		commands = commands->next;
	}
	i = 0;
	while (i <= totalStacks)
	{
		if (stacks2[i])
			printf("%c", stacks2[i]->content);
		i++;
	}

	// clean up
	while (commands)
	{
		t_commands *tmp = commands;
		commands = commands->next;
		free(tmp);
	}
	ft_free(stacks);
	ft_free(stacks2);
}

int	main(int argc, char **argv)
{
	int		fd;
	int		fileContentLen;
	char	*file;
	
	if (argc != 2)
	{
		printf("Error in input args passed\n");
		return (0);
	}
	fd = open(argv[1], O_RDONLY);
	if (fd == -1)
	{
		printf("Can not open file\n");
		return (0);
	}
	fileContentLen = getFileContentLen(argv[1]);
	file = malloc(fileContentLen + 1);
	file = getFileContent(fd, file);
	createStruct(file);
	free(file);
	close(fd);
	// system("leaks a.out");
	return (0);
}