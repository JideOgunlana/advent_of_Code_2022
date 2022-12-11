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
	addFront(dst, new);
	*stack = head->next;
}

/* void	delRearCrate(t_stack **src, t_stack **dst)
{
	t_stack *head = *src;
	t_stack *new;

	if (!head)
		return ;
	if (head->next == NULL)
	{
		new = newNode(head->content, head->stack_index);
		// printf("Last: %c\n", head->content);
		addFront(dst, new);
		*src = head->next;
		free(head);
		return ;
	}
	while (head)
	{
		if (head->next->next == NULL)
			break ;
		head = head->next;
	}
	new = newNode(head->next->content, head->next->stack_index);
	printf("new node added: %c\n", head->next->content);
	free(head->next);
	head->next = NULL;
	addFront(dst, new);
} */

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

	printf("index: %d\n", index);

	while (head)
	{
		printf("\nxx%cxx\n", head->content);
		head = head->next;
	}
	head = *src;
	if (!head)
		return ;
	if (index == i)
	{
		new = newNode(head->content, head->stack_index);
		addFront(dst, new);
		printf("\n&&&%c&&&\n", head->content);
		*src = head->next;
/* 		head = *dst;
		while (head)
		{
			printf("-----------\n");
			printf("\nxx%cxx\n", head->content);
			head = head->next;
		} */
		free(head);
		return ;
	}
	// A B C D
	// 1 2 3 4
	// prev = head;
	// *src = prev;
	while (head)
	{
		if (index == i)
		{
			prev->next = head->next;
			new = newNode(head->content, head->stack_index);
			addFront(dst, new);
			free(head);
			// head = prev->next;
			// prev = head;
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

/* void	moveCrate2(t_stack **src, t_stack **dst)
{
	if (!src)
		return ;
	delRearCrate(src, dst);
} */

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
	new->content = c;
	new->stack_index = index;
	new->next = NULL;
	return (new);
}

t_commands *newCommand(int move, int pA, int pB)
{
	t_commands *new;

	new = (t_commands *) malloc(sizeof(t_commands));
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
		printf("%c", *(file + i));
		i++;
	}
	return (i);
}

t_stack **createStacks(char *file, int i)
{
	t_stack	**stacks;

	stacks = (t_stack **) malloc(sizeof(t_stack) * (i + 1));
	if (!stacks)
		return (NULL);
	i = 0;
	int j = 0;
	while (*file != '\0')
	{
		if (isalpha(*file))
		{
			if (!stacks[j])
				stacks[j] = newNode(*file, j);
			else
				addBack(&stacks[j], newNode(*file, j));
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
	int	i;
	int	totalStacks;

	// gets total lines for input data
	totalStacks = getTotalStacks(file) / 4;
	// printf("Line 1: %d\n", i / 4);

	// creating each stack
	t_stack **stacks = createStacks(file, totalStacks);
	t_stack **stacks2 = createStacks(file, totalStacks);


	// move to the line of instructions
	while (*file)
	{
		if (*file == 'm')
			break ;
		file++;
	}
	i = 0;
	int totalCommands = 0;
	while (file[i] != '\0')
	{
		if (file[i] == '\n')
			totalCommands++;
		i++;
	}
	// printf("Total commands: %d\n", totalCommands);
	t_commands *commands;
	commands = (t_commands *)malloc(sizeof(t_commands) * (totalCommands + 1));
	if (!commands)
		return ;
	int reset_value = 0;
	int c1, c2, c3, nmb;
	int intialized_header = 0;
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
				if (!intialized_header)
				{
					commands->moves = c1;
					commands->pointA = c2;
					commands->pointB = c3;
					intialized_header = 1;
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
	// stacks to work on
/* 	t_stack *head = stacks[8];
	while (head)
	{
		printf("%c", head->content);
		head = head->next;
	}
	printf("\n");

	// commands to re-arrange stacks
	while (commands)
	{
		printf("%d\n", commands->moves);
		commands = commands->next;
	} */

	while (commands)
	{
		while (commands->moves > 0)
		{
			printf("\nmove from : %d to %d", commands->pointA, commands->pointB);
			if (stacks[commands->pointA - 1] != NULL)
			{
				if (commands->pointB - 1 > totalStacks)
				{
					printf("\n**No such stack exists**\n");
					break ;
				}
				if (stacks[commands->pointB - 1] == NULL)
				{
					printf("true\n");
					printf("%p\n", &stacks[commands->pointB - 1]);
					// exit(0);
				}
				moveCrate(&stacks[commands->pointA - 1], &stacks[commands->pointB - 1]);
			}
			commands->moves--;
		}
		commands = commands->next;
	}
	// printf("src:%c\n", stacks[0]->content);
	if (stacks[0])
		printf("\n[1]%c, ", stacks[0]->content);
	if (stacks[1])
		printf("[2]%c, ", stacks[1]->content);
	if (stacks[2])
		printf("[3]%c, ", stacks[2]->content);
	if (stacks[3])
		printf("[4]%c, ", stacks[3]->content);
	if (stacks[4])
		printf("[5]%c, ", stacks[4]->content);
	if (stacks[5])
		printf("[6]%c, ", stacks[5]->content);
	if (stacks[6])
		printf("[7]%c, ", stacks[6]->content);
	if (stacks[7])
		printf("[8]%c, ", stacks[7]->content);
	if (stacks[8])
		printf("[9]%c", stacks[8]->content);
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
				if (!intialized_header)
				{
					commands->moves = c1;
					commands->pointA = c2;
					commands->pointB = c3;
					intialized_header = 1;
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
/* 		if (stacks2[commands->pointA - 1] != NULL)
		{
			t_stack	*x = stacks2[commands->pointA - 1];
			int k = 0;
			while (x)
			{
				k++;
				x = x->next;
			}
			if (k == commands->moves)
			{
				while (commands->moves > 0)
				{
					printf("\nmove from : %d to %d", commands->pointA, commands->pointB);

					if (stacks2[commands->pointA - 1] != NULL)
					{
						if (commands->pointB - 1 > totalStacks)
						{
							printf("\n**No such stack exists**\n");
							break ;
						}
						if (stacks2[commands->pointB - 1] == NULL)
						{
							printf("true\n");
							printf("%p\n", &stacks2[commands->pointB - 1]);
							// exit(0);
						}
						moveCrate2(&stacks2[commands->pointA - 1], &stacks2[commands->pointB - 1]);
					}
					commands->moves--;
				}
			}
			else
			{
				while (commands->moves > 0)
				{
					printf("\nmove from : %d to %d", commands->pointA, commands->pointB);

					if (stacks2[commands->pointA - 1] != NULL)
					{
						if (commands->pointB - 1 > totalStacks)
						{
							printf("\n**No such stack exists**\n");
							break ;
						}
						if (stacks2[commands->pointB - 1] == NULL)
						{
							printf("true\n");
							printf("%p\n", &stacks2[commands->pointB - 1]);
							// exit(0);
						}
						moveCrate(&stacks2[commands->pointA - 1], &stacks2[commands->pointB - 1]);
					}
					commands->moves--;
				}
			}
		} */
		/* if (commands->moves == 1)
			moveCrate(&stacks2[commands->pointA - 1], &stacks2[commands->pointB - 1]);
		else
		{
			while (commands->moves > 0)
			{
				printf("\nmove from : %d to %d", commands->pointA, commands->pointB);

				if (stacks2[commands->pointA - 1] != NULL)
				{
					if (commands->pointB - 1 > totalStacks)
					{
						printf("\n**No such stack exists**\n");
						break ;
					}
					if (stacks2[commands->pointB - 1] == NULL)
					{
						printf("true\n");
						printf("%p\n", &stacks2[commands->pointB - 1]);
						// exit(0);
					}
					moveCrate2(&stacks2[commands->pointA - 1], &stacks2[commands->pointB - 1]);
				}
				commands->moves--;
			}
		} */
		commands = commands->next;
	}

	if (stacks2[0])
		printf("\n[1]%c, ", stacks2[0]->content);
	if (stacks2[1])
		printf("[2]%c, ", stacks2[1]->content);
	if (stacks2[2])
		printf("[3]%c, ", stacks2[2]->content);
	if (stacks2[3])
		printf("[4]%c, ", stacks2[3]->content);
	if (stacks2[4])
		printf("[5]%c, ", stacks2[4]->content);
	if (stacks2[5])
		printf("[6]%c, ", stacks2[5]->content);
	if (stacks2[6])
		printf("[7]%c, ", stacks2[6]->content);
	if (stacks2[7])
		printf("[8]%c, ", stacks2[7]->content);
	if (stacks2[8])
		printf("[9]%c", stacks2[8]->content);
}

int	main(int argc, char **argv)
{
	int		fd;
	char	*file;
	int		fileContentLen;
	
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
	// printf("%s", file);
	free(file);
	close(fd);
	return (0);
}