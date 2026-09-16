export const LEARN_FLOW = [
  {
    id: "syntax",
    title: "Syntax & types",
    emoji: "1",
    color: "coral",
    blurb: "Integers, floats, strings, bools, var/const, operators.",
    href: "/learn#syntax",
    practice: "/cards?tag=basics",
  },
  {
    id: "control",
    title: "Control flow",
    emoji: "2",
    color: "gold",
    blurb: "if / match / loops — make the computer choose.",
    href: "/learn#control",
    practice: "/cards?tag=control",
  },
  {
    id: "functions",
    title: "Functions",
    emoji: "3",
    color: "teal",
    blurb: "func, args, returns, _ready / _process.",
    href: "/learn#functions",
    practice: "/cards?tag=functions",
  },
  {
    id: "vectors",
    title: "Vectors & sprites",
    emoji: "4",
    color: "sky",
    blurb: "Vector2, position, velocity — make things move.",
    href: "/lab",
    practice: "/lab",
  },
  {
    id: "nodes",
    title: "Nodes & scenes",
    emoji: "5",
    color: "mint",
    blurb: "Scene tree, $ paths, @onready, instantiate.",
    href: "/learn#nodes",
    practice: "/cards?tag=godot",
  },
  {
    id: "signals",
    title: "Signals",
    emoji: "6",
    color: "coral",
    blurb: "connect, emit, await — events without spaghetti.",
    href: "/learn#signals",
    practice: "/cards?tag=signals",
  },
  {
    id: "2d",
    title: "2D games",
    emoji: "7",
    color: "gold",
    blurb: "CharacterBody2D, cameras, platformer & pong.",
    href: "/learn#gamedev2d",
    practice: "/build",
  },
  {
    id: "3d",
    title: "3D games",
    emoji: "8",
    color: "teal",
    blurb: "Node3D, Vector3, cameras, simple 3D movement.",
    href: "/learn#gamedev3d",
    practice: "/cards?tag=math",
  },
];

export const LEARN_SECTIONS = [
  {
    id: "syntax",
    title: "Syntax & types (the atoms)",
    roast: "Yes, we start at integers. No, you cannot skip to shaders yet.",
    blocks: [
      {
        h: "What is GDScript?",
        p: "Godot's Python-like language. Indentation matters. Colons start blocks. You attach scripts to nodes.",
      },
      {
        h: "Integers (int)",
        p: "Whole numbers: health, scores, ammo counts.",
        code: `var hp: int = 100
var coins := 3  # := guesses the type`,
      },
      {
        h: "Floats (float)",
        p: "Decimals: speed, timers, percentages.",
        code: `var speed: float = 220.5
var dt: float = 0.016`,
      },
      {
        h: "Strings & bools",
        p: "Text and true/false.",
        code: `var name: String = "Hero"
var alive: bool = true
print("Hi %s" % name)`,
      },
      {
        h: "var vs const",
        p: "var can change. const cannot — use for max HP, gravities, IDs.",
        code: `const MAX_HP := 100
var hp := MAX_HP
hp -= 10  # ok
# MAX_HP = 200  # error`,
      },
      {
        h: "Operators",
        p: "+ - * / %  and comparisons == != < > <= >=  and logic and / or / not",
        code: `var dmg = 5 * 2
if hp <= 0 and alive:
    alive = false`,
      },
    ],
  },
  {
    id: "control",
    title: "Control flow",
    roast: "Without if statements your game is a slideshow.",
    blocks: [
      {
        h: "if / elif / else",
        code: `if hp <= 0:
    die()
elif hp < 20:
    warn()
else:
    chill()`,
      },
      {
        h: "match (switch vibes)",
        code: `match state:
    "idle": play_idle()
    "run": play_run()
    _: pass`,
      },
      {
        h: "Loops",
        code: `for i in range(5):
    print(i)
for enemy in enemies:
    enemy.take_hit(1)
while loading:
    await get_tree().process_frame`,
      },
    ],
  },
  {
    id: "functions",
    title: "Functions & lifecycle",
    roast: "_ready is where dreams and null references collide.",
    blocks: [
      {
        h: "Defining functions",
        code: `func heal(amount: int) -> void:
    hp = mini(hp + amount, MAX_HP)

func get_ratio() -> float:
    return float(hp) / float(MAX_HP)`,
      },
      {
        h: "Lifecycle callbacks",
        p: "_ready() once when in tree. _process(delta) every frame. _physics_process(delta) on physics tick.",
        code: `func _ready() -> void:
    print("hello scene")

func _process(delta: float) -> void:
    # visuals / non-physics
    pass`,
      },
    ],
  },
  {
    id: "vectors",
    title: "Vectors & movement",
    roast: "Games are just vectors wearing costumes.",
    blocks: [
      {
        h: "Vector2",
        p: "x = right, y = down in 2D Godot. position, velocity, direction.",
        code: `var pos := Vector2(100, 200)
var vel := Vector2.RIGHT * 120
position += vel * delta`,
      },
      {
        h: "Useful helpers",
        code: `dir = dir.normalized()
dist = a.distance_to(b)
lerp_pos = a.lerp(b, 0.1)`,
      },
      {
        h: "Practice for real",
        p: "Open the Sprite Lab — write code, move a sprite, unlock levels.",
        code: `# Go to /lab and make the square walk.`,
      },
    ],
  },
  {
    id: "nodes",
    title: "Nodes, scenes, resources",
    roast: "Everything is a node. Even your mistakes.",
    blocks: [
      {
        h: "Scene tree",
        p: "Scenes (.tscn) are reusable node trees. Scripts extend a node type.",
        code: `extends Node2D
@onready var sprite: Sprite2D = $Sprite2D
@export var speed := 200.0`,
      },
      {
        h: "Spawning",
        code: `var packed = preload("res://enemy.tscn")
var e = packed.instantiate()
add_child(e)`,
      },
    ],
  },
  {
    id: "signals",
    title: "Signals",
    roast: "Events without telepathy. Revolutionary.",
    blocks: [
      {
        h: "Declare, connect, emit",
        code: `signal died
func kill():
    died.emit()

# elsewhere:
player.died.connect(_on_player_died)`,
      },
      {
        h: "await",
        code: `await get_tree().create_timer(1.0).timeout
await anim.animation_finished`,
      },
    ],
  },
  {
    id: "gamedev2d",
    title: "2D game building",
    roast: "Platformers: the 'hello world' of shame and glory.",
    blocks: [
      {
        h: "CharacterBody2D",
        code: `velocity.x = input * speed
velocity.y += gravity * delta
move_and_slide()`,
      },
      {
        h: "Build track",
        p: "After Level 2 XP: follow the Platformer and Ping Pong tutorials under Build.",
      },
      {
        h: "Also learn",
        p: "TileMaps, Cameras, Area2D hitboxes, AnimationPlayer, AudioStreamPlayer.",
      },
    ],
  },
  {
    id: "gamedev3d",
    title: "Into 3D",
    roast: "Congratulations — now you have a Z axis to regret.",
    blocks: [
      {
        h: "Node3D & Vector3",
        p: "Same ideas as 2D: position, basis, cameras — plus depth.",
        code: `extends CharacterBody3D
@export var speed := 5.0

func _physics_process(delta):
    var input := Input.get_vector("ui_left","ui_right","ui_up","ui_down")
    var dir := (transform.basis * Vector3(input.x, 0, input.y)).normalized()
    velocity.x = dir.x * speed
    velocity.z = dir.z * speed
    move_and_slide()`,
      },
      {
        h: "3D checklist",
        p: "MeshInstance3D for looks, CollisionShape3D for physics, Camera3D to see, Environment for lighting/sky. Start with a capsule + floor plane before your open-world MMO.",
      },
      {
        h: "From 2D skills → 3D",
        p: "Signals, scenes, resources, and input maps transfer. Only the math gains a dimension.",
      },
    ],
  },
];
